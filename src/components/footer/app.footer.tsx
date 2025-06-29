'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { Paper } from '@mui/material';
import { styled } from "@mui/material/styles";


// https://stackoverflow.com/questions/54375096/styling-bottomnavigation-in-react-js-material-ui

const MuiBottomNavigationAction = styled(BottomNavigationAction)(`
    color: "inherit";
    &.Mui-selected {
      color: #fb4810;
    }
  `);

export default function AppMenuFooter() {
    const [value, setValue] = React.useState(0);

    return (
        <Paper
            sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
            elevation={3}
        >
            <Box sx={{ width: '100%' }}>
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                >
                    <MuiBottomNavigationAction label="Menu" icon={<RestaurantMenuIcon />} />
                    <MuiBottomNavigationAction label="Giỏ hàng" icon={<ShoppingCartIcon />} />
                    <MuiBottomNavigationAction label="Nhà hàng" icon={<StorefrontIcon />} />
                </BottomNavigation>
            </Box>
        </Paper>

    );
}