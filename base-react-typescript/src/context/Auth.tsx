import { createContext, useState } from 'react';

const accessToken = localStorage.getItem('accessToken');
export const AuthContext = createContext<{ token: string | null; setToken: React.Dispatch<string> }>({
    token: accessToken,
    setToken: () => null,
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(accessToken);
    return <AuthContext.Provider value={{ token, setToken }}>{children}</AuthContext.Provider>;
};
export default AuthProvider;
