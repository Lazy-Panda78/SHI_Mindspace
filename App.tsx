import React, { useState } from 'react';
import { User, Profile } from './types';
import {
  ICONS,
  PHQ9_QUESTIONS,
  GAD7_QUESTIONS,
  RESPONSE_OPTIONS,
} from './constants';

// --- Reusable UI Components ---

// FIX: Changed to React.FC to correctly handle children props.
const GlassCard: React.FC<{ className?: string; onClick?: () => void; }> = ({ children, className = '', onClick }) => (
  <div onClick={onClick} className={`bg-white/50 backdrop-blur-lg border border-white/30 shadow-glass rounded-2xl p-6 ${className}`}>
    {children}
  </div>
);

// FIX: Changed to React.FC to correctly handle children props.
const Button: React.FC<{ onClick?: () => void; className?: string, type?: 'button' | 'submit' | 'reset' }> = ({ children, onClick, className = '', type = 'button' }) => (
  <button
    type={type}
    onClick={onClick}
    className={`px-4 py-2 bg-brand-cyan text-white font-semibold rounded-lg shadow-md hover:bg-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal focus:ring-opacity-75 transition-all duration-200 ${className}`}
  >
    {children}
  </button>
);

const Input = ({ type = 'text', placeholder, value, onChange, name, id }: { type?: string; placeholder: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; name: string; id: string; }) => (
    <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-cyan focus:border-brand-cyan transition-colors"
        required
    />
);


// --- Page/Feature Components ---

const Dashboard = ({ profile, onNavigate }: { profile: Profile | null, onNavigate: (page: string) => void }) => (
  <div className="animate-fade-in">
    <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome, {profile?.username || 'User'}!</h1>
    <p className="text-gray-600 mb-8">Your safe space for mental well-being. How can we help you today?</p>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <GlassCard className="hover:scale-105 transition-transform cursor-pointer" onClick={() => onNavigate('chat')}>
         <ICONS.chat className="w-10 h-10 text-brand-teal mb-4" />
        <h3 className="text-xl font-semibold text-gray-700">AI First-Aid Chat</h3>
        <p className="text-gray-500 mt-2">Get immediate, confidential support from our AI assistant.</p>
      </GlassCard>
       <GlassCard className="hover:scale-105 transition-transform cursor-pointer" onClick={() => onNavigate('screening')}>
         <ICONS.screening className="w-10 h-10 text-brand-teal mb-4" />
        <h3 className="text-xl font-semibold text-gray-700">Screening Tools</h3>
        <p className="text-gray-500 mt-2">Take a confidential assessment like PHQ-9 or GAD-7.</p>
      </GlassCard>
       <GlassCard className="hover:scale-105 transition-transform cursor-pointer" onClick={() => onNavigate('booking')}>
         <ICONS.booking className="w-10 h-10 text-brand-teal mb-4" />
        <h3 className="text-xl font-semibold text-gray-700">Book a Counselor</h3>
        <p className="text-gray-500 mt-2">Schedule a session with a licensed professional.</p>
      </GlassCard>
    </div>
  </div>
);

const AIChat = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your AI mental health assistant. How are you feeling today?", sender: 'ai' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'user' }]);
      setInput('');
      // Mock AI response
      setTimeout(() => {
        setMessages(prev => [...prev, { text: "Thank you for sharing. Can you tell me more about that?", sender: 'ai' }]);
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] animate-fade-in">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">AI First-Aid Chat</h2>
        <GlassCard className="flex-grow flex flex-col">
            <div className="flex-grow overflow-y-auto pr-4 space-y-4 mb-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${msg.sender === 'user' ? 'bg-brand-cyan text-white' : 'bg-gray-200 text-gray-800'}`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSend} className="mt-auto flex items-center">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    aria-label="Chat message input"
                    className="flex-grow px-4 py-2 border border-gray-300 rounded-full focus:ring-brand-cyan focus:border-brand-cyan transition-colors"
                />
                <button type="submit" aria-label="Send message" className="ml-3 p-3 bg-brand-cyan rounded-full text-white hover:bg-brand-teal transition-colors flex-shrink-0">
                    <ICONS.send className="w-6 h-6" />
                </button>
            </form>
        </GlassCard>
    </div>
  );
};

const ScreeningTool = () => {
  // Simple component, doesn't need to manage state for now
  return (
    <div className="animate-fade-in">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Screening Tools</h2>
        <div className="space-y-8">
            <GlassCard>
                <h3 className="text-2xl font-semibold text-gray-700 mb-4">PHQ-9 (Depression)</h3>
                <form className="space-y-4">
                    {PHQ9_QUESTIONS.map((q, i) => (
                        <fieldset key={i}>
                            <legend className="font-medium text-gray-600 mb-2">{i+1}. {q}</legend>
                             <div className="flex flex-wrap gap-x-6 gap-y-2">
                                {RESPONSE_OPTIONS.map((opt, j) => (
                                    <label key={j} className="flex items-center space-x-2 text-gray-600 cursor-pointer">
                                        <input type="radio" name={`phq9-${i}`} value={j} className="form-radio text-brand-cyan focus:ring-brand-cyan" />
                                        <span>{opt}</span>
                                    </label>
                                ))}
                            </div>
                        </fieldset>
                    ))}
                    <Button type="submit" className="mt-6">Submit PHQ-9</Button>
                </form>
            </GlassCard>
             <GlassCard>
                <h3 className="text-2xl font-semibold text-gray-700 mb-4">GAD-7 (Anxiety)</h3>
                 <form className="space-y-4">
                    {GAD7_QUESTIONS.map((q, i) => (
                        <fieldset key={i}>
                            <legend className="font-medium text-gray-600 mb-2">{i+1}. {q}</legend>
                            <div className="flex flex-wrap gap-x-6 gap-y-2">
                                {RESPONSE_OPTIONS.map((opt, j) => (
                                    <label key={j} className="flex items-center space-x-2 text-gray-600 cursor-pointer">
                                        <input type="radio" name={`gad7-${i}`} value={j} className="form-radio text-brand-cyan focus:ring-brand-cyan" />
                                        <span>{opt}</span>
                                    </label>
                                ))}
                            </div>
                        </fieldset>
                    ))}
                </form>
                <Button className="mt-6">Submit GAD-7</Button>
            </GlassCard>
        </div>
    </div>
  );
}


// --- Placeholder Components ---
const Booking = () => <div className="animate-fade-in"><h2 className="text-3xl font-bold text-gray-800">Counselor Booking</h2></div>;
const Resources = () => <div className="animate-fade-in"><h2 className="text-3xl font-bold text-gray-800">Resource Hub</h2></div>;
const Forum = () => <div className="animate-fade-in"><h2 className="text-3xl font-bold text-gray-800">Peer Support Forum</h2></div>;
const Directory = () => <div className="animate-fade-in"><h2 className="text-3xl font-bold text-gray-800">Counselor & Helpline Directory</h2></div>;
const Admin = () => <div className="animate-fade-in"><h2 className="text-3xl font-bold text-gray-800">Admin Dashboard</h2></div>;
const ProfilePage = () => <div className="animate-fade-in"><h2 className="text-3xl font-bold text-gray-800">User Profile</h2></div>;

// --- Sidebar ---
// FIX: Changed to React.FC to correctly handle special React props like `key`.
const SidebarNavItem: React.FC<{ icon: React.ReactNode; label: string; isActive: boolean; onClick: () => void; }> = ({ icon, label, isActive, onClick }) => (
    <li>
        <a
            href="#"
            onClick={(e) => { e.preventDefault(); onClick(); }}
            className={`flex items-center p-3 my-1 font-medium rounded-lg cursor-pointer transition-colors ${
                isActive
                    ? 'bg-brand-cyan/20 text-brand-teal'
                    : 'text-gray-600 hover:bg-brand-cyan/10 hover:text-brand-teal'
            }`}
            aria-current={isActive ? 'page' : undefined}
        >
            {icon}
            <span className="ml-4">{label}</span>
        </a>
    </li>
);

const Sidebar = ({ activePage, onNavigate, onLogout, profile }: { activePage: string; onNavigate: (page: string) => void; onLogout: () => void; profile: Profile | null; }) => {
    // FIX: Explicitly typed navItems to prevent `icon` property from being inferred as `any`.
    const navItems: { id: string; label: string; icon: React.ReactNode }[] = [
        { id: 'dashboard', label: 'Dashboard', icon: <ICONS.dashboard className="w-6 h-6" /> },
        { id: 'chat', label: 'AI Chat', icon: <ICONS.chat className="w-6 h-6" /> },
        { id: 'booking', label: 'Booking', icon: <ICONS.booking className="w-6 h-6" /> },
        { id: 'resources', label: 'Resources', icon: <ICONS.resources className="w-6 h-6" /> },
        { id: 'forum', label: 'Forum', icon: <ICONS.forum className="w-6 h-6" /> },
        { id: 'screening', label: 'Screening', icon: <ICONS.screening className="w-6 h-6" /> },
        { id: 'directory', label: 'Directory', icon: <ICONS.directory className="w-6 h-6" /> },
    ];
    
    return (
        <aside className="w-64 bg-white/40 backdrop-blur-lg p-4 flex flex-col h-screen fixed">
            <div className="text-2xl font-bold text-brand-teal mb-10 pl-2">MindSpace</div>
            <nav className="flex-grow" aria-label="Main navigation">
                <ul>
                    {navItems.map(item => (
                        <SidebarNavItem
                            key={item.id}
                            label={item.label}
                            icon={item.icon}
                            isActive={activePage === item.id}
                            onClick={() => onNavigate(item.id)}
                        />
                    ))}
                </ul>
            </nav>
            <div className="border-t border-gray-200/50 pt-4">
                 <ul>
                    <SidebarNavItem
                        label={profile?.username || 'Profile'}
                        icon={<ICONS.profile className="w-6 h-6" />}
                        isActive={activePage === 'profile'}
                        onClick={() => onNavigate('profile')}
                    />
                    <SidebarNavItem
                        label="Logout"
                        icon={<ICONS.logout className="w-6 h-6" />}
                        isActive={false}
                        onClick={onLogout}
                    />
                 </ul>
            </div>
        </aside>
    );
};


// --- Auth Component ---
const AuthComponent = ({ onLogin }: { onLogin: (user: User, profile: Profile) => void }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ email: '', password: '', username: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Mocking authentication
        const mockUser: User = { id: 'mock-user-id', email: formData.email };
        const mockProfile: Profile = { id: 'mock-user-id', username: isLogin ? 'DemoUser' : formData.username, updated_at: new Date().toISOString() };
        onLogin(mockUser, mockProfile);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-100 to-cyan-200 p-4">
            <GlassCard className="w-full max-w-md animate-fade-in">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
                <p className="text-center text-gray-600 mb-8">{isLogin ? 'Sign in to continue to MindSpace' : 'Get started on your journey'}</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                        <div>
                            <label htmlFor="username" className="sr-only">Username</label>
                            <Input id="username" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
                        </div>
                    )}
                    <div>
                        <label htmlFor="email" className="sr-only">Email Address</label>
                        <Input id="email" name="email" type="email" placeholder="Email Address" value={formData.email} onChange={handleChange} />
                    </div>
                    <div>
                         <label htmlFor="password"className="sr-only">Password</label>
                        <Input id="password" name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} />
                    </div>
                    <Button type="submit" className="w-full !py-3 !mt-6">{isLogin ? 'Sign In' : 'Sign Up'}</Button>
                </form>
                <p className="text-center text-sm text-gray-600 mt-6">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <button onClick={() => setIsLogin(!isLogin)} className="font-semibold text-brand-teal hover:underline ml-2">
                        {isLogin ? 'Sign Up' : 'Sign In'}
                    </button>
                </p>
            </GlassCard>
        </div>
    );
};


// --- Main App Component ---
export default function App() {
  const [session, setSession] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [activePage, setActivePage] = useState('dashboard');
  
  // A map of page IDs to components
  const pageComponents: { [key: string]: React.FC<any> } = {
    dashboard: (props) => <Dashboard {...props} />,
    chat: AIChat,
    booking: Booking,
    resources: Resources,
    forum: Forum,
    screening: ScreeningTool,
    directory: Directory,
    admin: Admin,
    profile: ProfilePage,
  };
  
  const ActivePageComponent = pageComponents[activePage];

  // Mock login/logout
  const handleLogin = (user: User, profileData: Profile) => {
    setSession(user);
    setProfile(profileData);
  };
  
  const handleLogout = () => {
    setSession(null);
    setProfile(null);
    setActivePage('dashboard');
  };

  if (!session) {
    return <AuthComponent onLogin={handleLogin} />;
  }

  return (
    <div className="flex bg-gradient-to-br from-teal-50 to-cyan-100 min-h-screen">
      <Sidebar 
        activePage={activePage} 
        onNavigate={setActivePage} 
        onLogout={handleLogout}
        profile={profile}
      />
      <main className="flex-grow ml-64 p-8 h-screen overflow-y-auto">
        <ActivePageComponent profile={profile} onNavigate={setActivePage} />
      </main>
    </div>
  );
}