"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import { fetchNewsData } from "@/services/news-service"
import type { NewsArticle } from "@/types/news"

export function NewsWidget() {
  const [category, setCategory] = useState("technology")
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null)

  const { data: newsData, isLoading } = useQuery({
    queryKey: ["news", category],
    queryFn: () => fetchNewsData(category),
    enabled: !!category,
  })

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>News</CardTitle>
            <CardDescription>Latest headlines</CardDescription>
          </div>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-[130px] h-8">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="business">Business</SelectItem>
              <SelectItem value="health">Health</SelectItem>
              <SelectItem value="sports">Sports</SelectItem>
              <SelectItem value="entertainment">Entertainment</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : newsData && newsData.length > 0 ? (
            <div className="space-y-4">
              {newsData.map((article, index) => (
                <div key={index} className="cursor-pointer group" onClick={() => setSelectedArticle(article)}>
                  <div className="flex gap-3">
                    {article.urlToImage && (
                      <div className="flex-shrink-0 w-20 h-20 overflow-hidden rounded-md">
                        <img
                          src={article.urlToImage || "/placeholder.svg"}
                          alt={article.title}
                          className="object-cover w-full h-full transition-transform group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-medium line-clamp-2 group-hover:text-primary transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(article.publishedAt).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{article.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p>No news articles available</p>
            </div>
          )}
        </ScrollArea>
      </CardContent>
      <Dialog open={!!selectedArticle} onOpenChange={(open) => !open && setSelectedArticle(null)}>
        <DialogContent className="max-w-2xl">
          {selectedArticle && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedArticle.title}</DialogTitle>
                <DialogDescription>
                  {new Date(selectedArticle.publishedAt).toLocaleDateString()} • {selectedArticle.source.name}
                </DialogDescription>
              </DialogHeader>
              {selectedArticle.urlToImage && (
                <div className="w-full h-56 overflow-hidden rounded-md">
                  <img
                    src={selectedArticle.urlToImage || "/placeholder.svg"}
                    alt={selectedArticle.title}
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
              <p>{selectedArticle.content || selectedArticle.description}</p>
              <div className="flex justify-end">
                <Button asChild>
                  <a href={selectedArticle.url} target="_blank" rel="noopener noreferrer">
                    Read Full Article
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  )
}
