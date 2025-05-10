import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Search, SlidersHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { companies } from '../types';
import { useTranslation } from 'react-i18next';

const Companies = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filteredCompanies, setFilteredCompanies] = useState(companies);

  useEffect(() => {
    const filtered = companies.filter((company) =>
      company.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCompanies(filtered);
  }, [searchTerm]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    // ... (rest of the handleFilterChange function remains the same)
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('Special Discounts')}</h2>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <ChevronLeft className="h-5 w-5 text-gray-500" />
          </div>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
            placeholder={t('Search companies...')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <ChevronRight className="h-5 w-5 text-gray-500" />
          </div>
        </div>
      </div>

      <div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">{t('Our Partner Companies')}</h2>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
          >
            {t('Filters')}
            <SlidersHorizontal className="h-5 w-5 ml-2 inline" />
          </button>
        </div>

        {showFilters && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold mb-2">{t('Company Type')}</h3>
                <select
                  name="companyType"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  onChange={handleFilterChange}
                >
                  <option value="">{t('All')}</option>
                  <option value="luxury">{t('Luxury')}</option>
                  <option value="adventure">{t('Adventure')}</option>
                  <option value="cultural">{t('Cultural')}</option>
                  <option value="family">{t('Family')}</option>
                  <option value="budget">{t('Budget')}</option>
                </select>
              </div>
              <div>
                <h3 className="font-semibold mb-2">{t('Destination')}</h3>
                <select
                  name="destination"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  onChange={handleFilterChange}
                >
                  <option value="">{t('Various destinations')}</option>
                  <option value="europe">{t('Europe')}</option>
                  <option value="asia">{t('Asia')}</option>
                  <option value="africa">{t('Africa')}</option>
                  <option value="southAmerica">{t('South America')}</option>
                  <option value="caribbean">{t('Caribbean')}</option>
                  <option value="pacific">{t('Pacific')}</option>
                  <option value="middleEast">{t('Middle East')}</option>
                </select>
              </div>
              <div>
                <h3 className="font-semibold mb-2">{t('Minimum Rating')}</h3>
                <select
                  name="minRating"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  onChange={handleFilterChange}
                >
                  <option value="">{t('Up')}</option>
                  <option value="4">{t('4 Up')}</option>
                  <option value="5">{t('5 Up')}</option>
                </select>
              </div>
            </div>
            <button
              onClick={() => {
                setSearchTerm('');
                setFilteredCompanies(companies);
                setShowFilters(false);
              }}
              className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
            >
              {t('Reset Filters')}
            </button>
          </div>
        )}

        <div className="space-y-6">
          {filteredCompanies.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-700">{t('No companies found')}</h3>
              <p className="text-gray-500 mt-2">{t('Try adjusting your filters or search criteria')}</p>
            </div>
          ) : (
            filteredCompanies.map((company) => (
              <div
                key={company.id}
                className="bg-white rounded-lg shadow-lg p-6 flex items-center space-x-4 cursor-pointer"
                onClick={() => navigate(`/companies/${company.id}`)}
              >
                <img src={company.image} alt={company.name} className="h-20 w-20 rounded-lg" />
                <div>
                  <h3 className="text-lg font-semibold">{company.name}</h3>
                  <p className="text-gray-500 text-sm">{company.description}</p>
                </div>
                <Star className="h-6 w-6 text-yellow-500" />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Companies;
