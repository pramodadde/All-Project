import React, {useContext} from 'react';
import { MyContext } from '../MyProvider/MyProvider';

function StudentHome(props) {
    const [flags, setFlags] = useContext(MyContext);
    setFlags({
        sidebar: true,
        addStudent: false,
        createSession: false,
        liveSession: true,
        attendance: true,
        logout: true
    });
    return (
        <div>
            <h1>StudentHome</h1>
        </div>
    );
}

export default StudentHome;