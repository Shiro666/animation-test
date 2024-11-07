import reactLogo from '../../assets/react.svg';
import './index.scss';

export default function NotFoundPage() {
    return (
        <div className="App">
            <div>
                <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
                    <img src="/vite.svg" className="logo" alt="Vite logo" />
                </a>
                <a href="https://reactjs.org" target="_blank" rel="noreferrer">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>404 Not Found</h1>
        </div>
    );
}
