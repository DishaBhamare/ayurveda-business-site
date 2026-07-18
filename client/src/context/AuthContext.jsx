import { createContext, useState, useEffect} from "react";

const AuthContext= createContext(); //it is createContext and not Context() because it context is not created new will be created 

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedUser){
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
    }
    setLoading(false);

},[]);

//Login function to set the user and token in the state and localStorage
      const login = (data) => {
         setUser(data.user);
         setToken(data.token);
         
         localStorage.setItem("user", JSON.stringify(data.user));
         localStorage.setItem("token", data.token);
    };  

    //Logout function to clear the user and token from the state and localStorage
    const logout = () => {
      setUser(null);
      setToken(null);

      localStorage.removeItem("user");
      localStorage.removeItem("token");
      
}
return (
  <AuthContext.Provider
    value={{
      user,
      token,
      loading,
      login,
      logout,
    }}
  >
    {children}
  </AuthContext.Provider>
);

}

export default AuthContext;

