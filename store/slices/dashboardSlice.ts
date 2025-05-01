import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

type WidgetId = string

type WidgetLayout = {
  id: WidgetId
  x: number
  y: number
  w: number
  h: number
}

type DashboardState = {
  layout: WidgetLayout[]
  widgets: {
    [key: WidgetId]: {
      id: WidgetId
      type: string
      title: string
      settings: Record<string, any>
    }
  }
}

const initialState: DashboardState = {
  layout: [],
  widgets: {},
}

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    updateLayout: (state, action: PayloadAction<WidgetLayout[]>) => {
      state.layout = action.payload
    },
    addWidget: (
      state,
      action: PayloadAction<{
        id: WidgetId
        type: string
        title: string
        layout: WidgetLayout
        settings: Record<string, any>
      }>,
    ) => {
      const { id, type, title, layout, settings } = action.payload
      state.widgets[id] = { id, type, title, settings }
      state.layout.push(layout)
    },
    removeWidget: (state, action: PayloadAction<WidgetId>) => {
      const id = action.payload
      delete state.widgets[id]
      state.layout = state.layout.filter((item) => item.id !== id)
    },
    updateWidgetSettings: (
      state,
      action: PayloadAction<{
        id: WidgetId
        settings: Record<string, any>
      }>,
    ) => {
      const { id, settings } = action.payload
      if (state.widgets[id]) {
        state.widgets[id].settings = {
          ...state.widgets[id].settings,
          ...settings,
        }
      }
    },
  },
})

export const { updateLayout, addWidget, removeWidget, updateWidgetSettings } = dashboardSlice.actions
export default dashboardSlice.reducer
