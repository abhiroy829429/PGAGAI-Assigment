import type { NewsArticle } from "@/types/news"

// Mock data for development
const mockNewsData: Record<string, NewsArticle[]> = {
  technology: [
    {
      title: "Apple Announces New MacBook Pro with M3 Chip",
      description:
        "Apple has unveiled its latest MacBook Pro featuring the new M3 chip, promising significant performance improvements.",
      content:
        "Apple has unveiled its latest MacBook Pro featuring the new M3 chip, promising significant performance improvements. The new chip is said to be 40% faster than the previous generation M2 and offers improved power efficiency. The new MacBook Pro models will be available in 14-inch and 16-inch sizes, with configurations offering up to 32GB of unified memory.",
      url: "https://example.com/apple-m3-macbook",
      urlToImage: "/placeholder.svg?height=200&width=300",
      publishedAt: "2023-10-30T14:30:00Z",
      source: {
        id: "techcrunch",
        name: "TechCrunch",
      },
    },
    {
      title: "Microsoft Introduces AI-Powered Features for Office 365",
      description:
        "Microsoft has announced new AI features for its Office 365 suite, aimed at improving productivity and collaboration.",
      content:
        "Microsoft has announced new AI features for its Office 365 suite, aimed at improving productivity and collaboration. The new features include AI-powered writing suggestions in Word, automatic slide creation in PowerPoint based on document content, and smart scheduling in Outlook. These features are powered by Microsoft's Azure OpenAI Service and will be rolled out to subscribers over the coming months.",
      url: "https://example.com/microsoft-ai-office",
      urlToImage: "/placeholder.svg?height=200&width=300",
      publishedAt: "2023-10-25T09:15:00Z",
      source: {
        id: "microsoft",
        name: "Microsoft Blog",
      },
    },
    {
      title: "Google Releases New Version of TensorFlow",
      description:
        "Google has released TensorFlow 2.12 with new features and performance improvements for machine learning developers.",
      content:
        "Google has released TensorFlow 2.12, the latest version of its popular open-source machine learning framework. The new version includes improved GPU acceleration, better integration with JAX, and new tools for model optimization. The update also addresses several security vulnerabilities and bug fixes reported by the community. Machine learning developers can download the new version from the TensorFlow website or via pip.",
      url: "https://example.com/tensorflow-update",
      urlToImage: "/placeholder.svg?height=200&width=300",
      publishedAt: "2023-10-20T11:45:00Z",
      source: {
        id: "google",
        name: "Google AI Blog",
      },
    },
  ],
  business: [
    {
      title: "Amazon Reports Record Q3 Earnings",
      description: "Amazon has reported record earnings for the third quarter, exceeding analyst expectations.",
      content:
        "Amazon has reported record earnings for the third quarter of the fiscal year, with revenue reaching $143.1 billion, a 13% increase year-over-year. The company's cloud division, Amazon Web Services (AWS), continued to be a major driver of growth, with revenue increasing by 12% to $23.1 billion. The e-commerce giant also saw significant growth in its advertising business, which generated $12.1 billion in revenue, up 25% from the previous year.",
      url: "https://example.com/amazon-earnings",
      urlToImage: "/placeholder.svg?height=200&width=300",
      publishedAt: "2023-10-28T16:00:00Z",
      source: {
        id: "bloomberg",
        name: "Bloomberg",
      },
    },
    {
      title: "Tesla Expands Gigafactory Operations in Europe",
      description:
        "Tesla has announced plans to expand its Gigafactory operations in Berlin, creating thousands of new jobs.",
      content:
        "Tesla has announced plans to expand its Gigafactory operations in Berlin, with an investment of €5 billion that will create approximately 10,000 new jobs. The expansion will increase the factory's production capacity from 500,000 to 1 million vehicles per year by 2025. The move comes as Tesla aims to meet growing demand for electric vehicles in Europe and strengthen its manufacturing presence in the region.",
      url: "https://example.com/tesla-expansion",
      urlToImage: "/placeholder.svg?height=200&width=300",
      publishedAt: "2023-10-26T13:20:00Z",
      source: {
        id: "reuters",
        name: "Reuters",
      },
    },
  ],
  health: [
    {
      title: "New Study Shows Benefits of Mediterranean Diet",
      description:
        "A new study has found that following a Mediterranean diet can significantly reduce the risk of heart disease.",
      content:
        "A new study published in the New England Journal of Medicine has found that following a Mediterranean diet can significantly reduce the risk of heart disease and stroke. The study, which followed over 10,000 participants for a period of five years, found that those who adhered closely to the diet had a 30% lower risk of major cardiovascular events compared to those on a standard low-fat diet. The Mediterranean diet is rich in olive oil, nuts, fruits, vegetables, and fish.",
      url: "https://example.com/mediterranean-diet",
      urlToImage: "/placeholder.svg?height=200&width=300",
      publishedAt: "2023-10-27T10:45:00Z",
      source: {
        id: "health",
        name: "Health News",
      },
    },
  ],
  sports: [
    {
      title: "Lakers Win NBA Championship",
      description:
        "The Los Angeles Lakers have won their 18th NBA Championship, defeating the Boston Celtics in Game 7.",
      content:
        "The Los Angeles Lakers have won their 18th NBA Championship, defeating the Boston Celtics 112-108 in Game 7 of the NBA Finals. LeBron James was named Finals MVP after averaging 28.5 points, 10.2 rebounds, and 8.3 assists per game in the series. This championship gives the Lakers the most titles in NBA history, breaking their tie with the Celtics at 17 championships each.",
      url: "https://example.com/lakers-championship",
      urlToImage: "/placeholder.svg?height=200&width=300",
      publishedAt: "2023-10-29T08:30:00Z",
      source: {
        id: "espn",
        name: "ESPN",
      },
    },
  ],
  entertainment: [
    {
      title: "New Star Wars Series Announced for Disney+",
      description: "Disney has announced a new Star Wars series that will explore the origins of the Jedi Order.",
      content:
        "Disney has announced a new Star Wars series for its Disney+ streaming service that will explore the origins of the Jedi Order. The series, titled 'Star Wars: Dawn of the Jedi,' is set thousands of years before the events of the Skywalker saga and will delve into the formation of the Jedi Order and their early conflicts with the Sith. The series is expected to premiere in late 2024 and will be directed by Deborah Chow, who previously worked on 'The Mandalorian' and 'Obi-Wan Kenobi.'",
      url: "https://example.com/star-wars-series",
      urlToImage: "/placeholder.svg?height=200&width=300",
      publishedAt: "2023-10-24T15:10:00Z",
      source: {
        id: "variety",
        name: "Variety",
      },
    },
  ],
}

export async function fetchNewsData(category: string): Promise<NewsArticle[]> {
  try {
    // In a real application, you would fetch from the NewsAPI
    // const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;
    // const response = await fetch(`https://newsapi.org/v2/top-headlines?category=${category}&language=en&apiKey=${apiKey}`);
    // const data = await response.json();
    // return data.articles;

    // For now, return mock data
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockNewsData[category] || [])
      }, 500)
    })
  } catch (error) {
    console.error("Error fetching news data:", error)
    return []
  }
}
