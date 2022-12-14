import { lazy, Suspense, useEffect } from 'react';

/// Components
import Index from "./jsx";
import { connect, useDispatch } from 'react-redux';
import {  Route, Switch, withRouter } from 'react-router-dom';
// action
import { checkAutoLogin } from './services/AuthService';
import { isAuthenticated } from './store/selectors/AuthSelectors';
/// Style
import './vendor/swiper/swiper-bundle.css';
import "./vendor/bootstrap-select/dist/css/bootstrap-select.min.css";
import "./css/style.css";
import {EthProvider} from "./jsx/components/EthContext";
import SocialRecoveryConfirm from "./jsx/components/Dashboard/SocialRecoveryConfirm";
import SocialRecoveryUnlock from "./jsx/components/Dashboard/SocialRecoveryUnlock";


const SignUp = lazy(() => import('./jsx/pages/Registration'));
const ForgotPassword = lazy(() => import('./jsx/pages/ForgotPassword'));
const Login = lazy(() => {
    return new Promise(resolve => {
    setTimeout(() => resolve(import('./jsx/pages/Login')), 500);
  });
});

function App (props) {
    const dispatch = useDispatch();
    useEffect(() => {
        checkAutoLogin(dispatch, props.history);
    }, [dispatch, props.history]);
    
    let routes = (  
        <Switch>
            <EthProvider>
            <Route path='/deana/login' component={Login} />
            <Route path='/deana/page-register' component={SignUp} />
            <Route path='/deana/help' component={ForgotPassword} />
            <Route path='/deana/page-social-recovery-confirm' component={SocialRecoveryConfirm} />
            <Route path='/deana/page-social-recovery-unlock' component={SocialRecoveryUnlock} />
            </EthProvider>
        </Switch>
    );
    if (props.isAuthenticated) {
		return (
			<>

                <Suspense fallback={
                    <div id="preloader">
                        <div className="sk-three-bounce">
                            <div className="sk-child sk-bounce1"></div>
                            <div className="sk-child sk-bounce2"></div>
                            <div className="sk-child sk-bounce3"></div>
                        </div>
                    </div>  
                   }
                >
                    <EthProvider>
                    <Index / >
                        </EthProvider>
                </Suspense>

            </>
        );
	
	}else{
		return (
			<div className="vh-100">
                <Suspense fallback={
                    <div id="preloader">
                        <div className="sk-three-bounce">
                            <div className="sk-child sk-bounce1"></div>
                            <div className="sk-child sk-bounce2"></div>
                            <div className="sk-child sk-bounce3"></div>
                        </div>
                    </div>
                  }
                >
                    {routes}
                </Suspense>
			</div>
		);
	}
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: isAuthenticated(state),
    };
};

export default withRouter(connect(mapStateToProps)(App)); 

