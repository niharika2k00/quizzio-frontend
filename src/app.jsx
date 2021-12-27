import { useState, useMemo } from 'react';
import { Switch, Route, useLocation, Redirect } from 'react-router-dom';
import CreateExam from 'pages/exam-creation';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Paper } from '@mui/material';
import Navbar from 'components/navbar';
import Signup from 'pages/auth/signup';
import Login from 'pages/auth/login';
import User from 'pages/profile/User';
import Home from 'pages/home';
import GiveExam from 'pages/give-exam';
import ExamDetails from 'pages/exam-details';
import getDesignTokens from 'utilities/theme';

const App = () => {
  const location = useLocation();
  const [themeMode, setThemeMode] = useState('light');

  // The dark mode switch would invoke this method
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  const toggleTheme = () => {
    setThemeMode((t) => (t === 'light' ? 'dark' : 'light'));
  };

  // Update the theme only if the mode changes
  const theme = useMemo(() => createTheme(getDesignTokens(themeMode)), [themeMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Paper elevation={0} style={{ width: '100%', minHeight: '100vh', height: '100%' }}>
        {!location.pathname.includes('/give') && <Navbar toggleTheme={toggleTheme} />}
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/signup' exact component={Signup} />
          <Route exact path='/login' exact component={Login} />
          <Route exact path='/create-exam' component={CreateExam} />
          <Route exact path='/profile' component={User} />
          <Route exact path='/exam/:id' component={ExamDetails} />
          <Route exact path='/exam/:id/give' component={GiveExam} />
          <Redirect to='/' />
        </Switch>
      </Paper>
    </ThemeProvider>
  );
};

export default App;
