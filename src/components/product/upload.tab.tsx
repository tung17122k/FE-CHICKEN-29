'use client'

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useState } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import UploadForm from './steps/upload.form';


interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;

}






function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;






    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}


function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


const UploadTab = () => {


    const [value, setValue] = useState<number>(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" TabIndicatorProps={{ sx: { backgroundColor: 'orange.main' } }}>
                    <Tab icon={<AddCircleIcon />} iconPosition="start" label="Create product" {...a11yProps(0)} sx={{
                        color: 'gray',
                        '&.Mui-selected': {
                            color: 'orange.main',
                            fontWeight: 'bold',
                        },
                        textTransform: 'none',
                    }} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0} >
                <UploadForm />
            </CustomTabPanel >
        </Box>
    )
}

export default UploadTab