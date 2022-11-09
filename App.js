import { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Login from './components/Login';
import { NativeRouter, Route, Routes } from 'react-router-native';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';

export default function App() {
  const [isUserLogged, setIsUserLogged] = useState(false)
  const PrivateRoute = ({ children }) => {
    const location = useLocation();

    return isUserLogged ? (
      children
    ) : (
      <Navigate to="/login" state={{ from: location }} replace />

    );
  }
  const Test = () => {
    const navigate = useNavigate()
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <Text style={{ marginTop: 50, color: "white" }}>Homepage /</Text>
        <Button title="Go to login" onPress={() => navigate('/login')} />
      </View>

    )
  }
  return (
    <NativeRouter>
      <Routes>
        <Route path='/' element={<PrivateRoute><Test /></PrivateRoute>} />
        <Route path='/login' element={<Login isUserLogged={isUserLogged} setIsUserLogged={setIsUserLogged} />} />
      </Routes>
    </NativeRouter >
  );
}

const styles = StyleSheet.create({

});
