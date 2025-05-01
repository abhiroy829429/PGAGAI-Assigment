export interface StockData {
  symbol: string
  companyName: string
  price: number
  change: number
  changePercent: number
  open: number
  high: number
  low: number
  volume: number
  marketCap: number
  peRatio: number
  week52High: number
  week52Low: number
  dividendYield: number
  avgVolume: number
}

export interface StockTimeSeriesData {
  date: string
  open: string
  high: string
  low: string
  close: string
  volume: number
}
