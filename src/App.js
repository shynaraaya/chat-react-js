import {Fragment} from "react";
import {Header} from "./components/header/Header";
import {Chat} from "./components/chat/Chat";

function App() {
    return (
        <Fragment>
            <Header/>
            <Chat/>
        </Fragment>
    );
}

export default App;
