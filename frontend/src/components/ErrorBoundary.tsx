import { AlertCircle, RefreshCw } from "lucide-react";
import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    // Update state to show fallback UI on error
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    // You can log the error to an external service here
  }

  handleReload = () => {
    this.setState({ hasError: false }); // Reset error state
    window.location.reload(); // Refresh the page
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6">
          <div className="bg-gray-950 p-10 rounded-2xl shadow-lg text-center border border-gray-700">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto animate-pulse" />
            <h2 className="text-3xl font-bold mt-4">Oops! Something went wrong.</h2>
            <p className="text-gray-400 mt-2">We encountered an unexpected error. Please try refreshing.</p>
            <div className="mt-6">
              <button
                onClick={this.handleReload}
                className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 transition-all rounded-lg text-lg font-medium"
              >
                <RefreshCw className="w-5 h-5 animate-spin" />
                Reload Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
