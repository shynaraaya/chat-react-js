import { AppBar, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Fragment } from "react";
import ChatIcon from "@mui/icons-material/Chat";

export const Header = () => {
    return (
        <Fragment>
            <Box mb={4}>
                <AppBar position="static" color={'secondary'}>
                    <Toolbar>
                        <Box mr={2}>
                            <ChatIcon fontSize={'medium'}/>
                        </Box>
                        <Typography variant="h6">
                            Чат-приложение
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
        </Fragment>
    )
}
