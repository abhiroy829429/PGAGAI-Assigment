import type { StockData, StockTimeSeriesData } from "@/types/finance"

// Mock data for development
const mockStockData: Record<string, StockData> = {
  AAPL: {
    symbol: "AAPL",
    companyName: "Apple Inc.",
    price: 175.42,
    change: 2.35,
    changePercent: 1.36,
    open: 173.05,
    high: 176.82,
    low: 172.98,
    volume: 67584321,
    marketCap: 2750000000000,
    peRatio: 28.5,
    week52High: 198.23,
    week52Low: 142.65,
    dividendYield: 0.58,
    avgVolume: 58234567,
  },
  MSFT: {
    symbol: "MSFT",
    companyName: "Microsoft Corporation",
    price: 340.67,
    change: -1.23,
    changePercent: -0.36,
    open: 342.01,
    high: 343.25,
    low: 339.78,
    volume: 23456789,
    marketCap: 2530000000000,
    peRatio: 32.1,
    week52High: 366.78,
    week52Low: 241.51,
    dividendYield: 0.82,
    avgVolume: 25678901,
  },
  GOOGL: {
    symbol: "GOOGL",
    companyName: "Alphabet Inc.",
    price: 132.58,
    change: 0.87,
    changePercent: 0.66,
    open: 131.75,
    high: 133.42,
    low: 131.02,
    volume: 18765432,
    marketCap: 1680000000000,
    peRatio: 25.3,
    week52High: 142.38,
    week52Low: 89.46,
    dividendYield: 0,
    avgVolume: 20123456,
  },
  AMZN: {
    symbol: "AMZN",
    companyName: "Amazon.com, Inc.",
    price: 128.91,
    change: 1.45,
    changePercent: 1.14,
    open: 127.5,
    high: 129.87,
    low: 127.12,
    volume: 35678901,
    marketCap: 1320000000000,
    peRatio: 94.2,
    week52High: 146.57,
    week52Low: 81.43,
    dividendYield: 0,
    avgVolume: 40123456,
  },
  TSLA: {
    symbol: "TSLA",
    companyName: "Tesla, Inc.",
    price: 215.65,
    change: -3.78,
    changePercent: -1.72,
    open: 219.43,
    high: 220.82,
    low: 214.21,
    volume: 98765432,
    marketCap: 684000000000,
    peRatio: 55.3,
    week52High: 299.29,
    week52Low: 152.31,
    dividendYield: 0,
    avgVolume: 105678901,
  },
}

// Generate mock time series data
function generateMockTimeSeriesData(symbol: string, timeRange: string): StockTimeSeriesData[] {
  const data: StockTimeSeriesData[] = []
  const now = new Date()
  const basePrice = mockStockData[symbol]?.price || 100
  let points = 0

  switch (timeRange) {
    case "1d":
      points = 24
      break
    case "1w":
      points = 7
      break
    case "1m":
      points = 30
      break
    case "1y":
      points = 12
      break
    default:
      points = 24
  }

  for (let i = 0; i < points; i++) {
    const date = new Date()
    const randomFactor = 0.05 // 5% variation

    switch (timeRange) {
      case "1d":
        date.setHours(now.getHours() - (points - i))
        break
      case "1w":
        date.setDate(now.getDate() - (points - i))
        break
      case "1m":
        date.setDate(now.getDate() - (points - i))
        break
      case "1y":
        date.setMonth(now.getMonth() - (points - i))
        break
    }

    const randomChange = basePrice * randomFactor * (Math.random() * 2 - 1)
    const price = basePrice + randomChange * (i / points)

    data.push({
      date: date.toISOString(),
      open: price.toFixed(2),
      high: (price * (1 + Math.random() * 0.02)).toFixed(2),
      low: (price * (1 - Math.random() * 0.02)).toFixed(2),
      close: price.toFixed(2),
      volume: Math.floor(Math.random() * 10000000) + 5000000,
    })
  }

  return data
}

export async function fetchStockData(symbol: string): Promise<StockData> {
  try {
    // In a real application, you would fetch from the Alpha Vantage API
    // const apiKey = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY;
    // const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`);
    // const data = await response.json();
    // return transformStockData(data);

    // For now, return mock data
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          mockStockData[symbol] || {
            symbol: symbol,
            companyName: `${symbol} Inc.`,
            price: 100.0,
            change: 0.0,
            changePercent: 0.0,
            open: 100.0,
            high: 100.0,
            low: 100.0,
            volume: 0,
            marketCap: 0,
            peRatio: 0,
            week52High: 0,
            week52Low: 0,
            dividendYield: 0,
            avgVolume: 0,
          },
        )
      }, 500)
    })
  } catch (error) {
    console.error("Error fetching stock data:", error)
    return {
      symbol: symbol,
      companyName: `${symbol} Inc.`,
      price: 100.0,
      change: 0.0,
      changePercent: 0.0,
      open: 100.0,
      high: 100.0,
      low: 100.0,
      volume: 0,
      marketCap: 0,
      peRatio: 0,
      week52High: 0,
      week52Low: 0,
      dividendYield: 0,
      avgVolume: 0,
    }
  }
}

export async function fetchStockTimeSeries(symbol: string, timeRange: string): Promise<StockTimeSeriesData[]> {
  try {
    // In a real application, you would fetch from the Alpha Vantage API
    // const apiKey = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY;
    // let function = 'TIME_SERIES_INTRADAY';
    // let interval = '60min';
    //
    // if (timeRange === '1w') {
    //   function = 'TIME_SERIES_DAILY';
    // } else if (timeRange === '1m') {
    //   function = 'TIME_SERIES_DAILY';
    // } else if (timeRange === '1y') {
    //   function = 'TIME_SERIES_MONTHLY';
    // }
    //
    // const response = await fetch(`https://www.alphavantage.co/query?function=${function}&symbol=${symbol}&interval=${interval}&apikey=${apiKey}`);
    // const data = await response.json();
    // return transformTimeSeriesData(data, timeRange);

    // For now, return mock data
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(generateMockTimeSeriesData(symbol, timeRange))
      }, 500)
    })
  } catch (error) {
    console.error("Error fetching stock time series:", error)
    // Return a minimal dataset in case of error
    return Array(5)
      .fill(null)
      .map((_, i) => ({
        date: new Date().toISOString(),
        open: "100.00",
        high: "101.00",
        low: "99.00",
        close: "100.50",
        volume: 1000000,
      }))
  }
}
