import { Box } from '@mui/material'
import React from 'react'
import MonthlySummary from '../components/MonthlySummary'
import Calender from '../components/Calender'
import TransactionMenu from '../components/TransactionMenu'
import TransactionForm from '../components/TransactionForm'

const Home = () => {
  return (
    <Box sx={{display: 'flex'}}>
      {/* 左側コンテンツ */}
      <Box sx={{flexGrow: 1, bgcolor: 'pink'}}>
        <MonthlySummary />
        <Calender />
      </Box>
      {/* 右側コンテンツ */}
      <Box>
        <TransactionMenu />
        <TransactionForm />
      </Box>
    </Box>
  )
}

export default Home