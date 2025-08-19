import React, { useState } from 'react';
import { Menu, LogOut } from 'lucide-react';
import Sidebar from './Sidebar';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';
import { useAuth } from '../context/AuthContext';
import { SearchFilters, PadronRecord } from '../types';
import { supabase } from '../lib/supabase';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState('search');
  const [searchResults, setSearchResults] = useState<PadronRecord[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (filters: SearchFilters) => {
    setIsSearching(true);
    setHasSearched(true);
    
    try {
      let query = supabase.from('bd_padron25').select('*');
      
      // Aplicar filtros
      if (filters.documento) {
        query = query.ilike('DOCUMENTO', `%${filters.documento}%`);
      }
      
      if (filters.apellido) {
        query = query.ilike('APELLIDO', `%${filters.apellido}%`);
      }
      
      if (filters.nombre) {
        query = query.ilike('NOMBRE', `%${filters.nombre}%`);
      }
      
      if (filters.localidad) {
        query = query.ilike('LOCALIDAD', `%${filters.localidad}%`);
      }
      
      if (filters.circuito) {
        query = query.ilike('CIRCUITO', `%${filters.circuito}%`);
      }
      
      if (filters.mesa) {
        query = query.eq('MESA', filters.mesa);
      }
      
      if (filters.clase) {
        query = query.eq('CLASE', filters.clase);
      }
      
      // Limitar resultados para mejor rendimiento
      query = query.limit(100);
      
      const { data, error } = await query;
      
      if (error) {
        console.error('Error searching padron:', error);
        setSearchResults([]);
      } else {
        setSearchResults(data || []);
      }
    } catch (error) {
      console.error('Error during search:', error);
      setSearchResults([]);
    }
    
    setIsSearching(false);
  };

  const renderContent = () => {
    switch (activeView) {
      case 'search':
        return (
          <div className="space-y-6">
            <SearchForm onSearch={handleSearch} isLoading={isSearching} />
            {hasSearched && (
              <SearchResults results={searchResults} isLoading={isSearching} />
            )}
          </div>
        );
      case 'padrones':
        return (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Gestión de Padrones</h2>
            <p className="text-gray-600">Funcionalidad de gestión de padrones en desarrollo.</p>
          </div>
        );
      case 'settings':
        return (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Configuración</h2>
            <p className="text-gray-600">Panel de configuración del sistema.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        isOpen={sidebarOpen} 
        setIsOpen={setSidebarOpen}
        activeView={activeView}
        setActiveView={setActiveView}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-500 hover:text-gray-700 transition-colors"
              >
                <Menu className="w-6 h-6" />
              </button>
              <h1 className="text-xl font-semibold text-gray-900">
                {user?.name}
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={logout}
                className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:bg-red-50 hover:text-red-700 rounded-lg transition-all duration-200"
                title="Cerrar Sesión"
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:inline">Cerrar Sesión</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-auto p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}