import { useState } from "react";

interface User {
    displayName: string | null
}

interface LogInWrapperProps{
    loggedIn: User | null
}

export const LogInWrapper: React.FC<LogInWrapperProps> = ({ loggedIn }) => {
    
    return(
        <div>
            <p>{loggedIn ? loggedIn.displayName: <p>Log In</p>}</p>
        </div>
    )
}

