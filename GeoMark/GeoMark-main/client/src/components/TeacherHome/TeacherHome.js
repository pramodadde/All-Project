import React, {useContext} from 'react';
import { MyContext } from '../MyProvider/MyProvider';

function TeacherHome(props) {
    const [flags, setFlags] = useContext(MyContext);
    setFlags({
        sidebar: true,
        addStudent: true,
        createSession: true,
        liveSession: false,
        attendance: false,
        logout: true
    });
    return (
        <div>
            <h1>TeacherHome</h1>
        </div>
    );
}

export default TeacherHome;