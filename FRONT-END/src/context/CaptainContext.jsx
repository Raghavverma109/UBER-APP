import React, { createContext, useState, useContext } from 'react';

export const CaptainDataContext = createContext();

export const useCaptain = () => {
    return useContext(CaptainDataContext);
};

export const CaptainContext = ({ children }) => {
    const [captain, setCaptain] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Add captain
    const addCaptain = async (captainData) => {
        setIsLoading(true);
        try {
            // Add API call here to create captain
            setCaptain(captainData);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    // Update captain
    const updateCaptain = async (captainId, updateData) => {
        setIsLoading(true);
        try {
            // Add API call here to update captain
            setCaptain((prev) => ({ ...prev, ...updateData }));
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    // Get captain
    const getCaptain = async (captainId) => {
        setIsLoading(true);
        try {
            // Add API call here to get captain
            // const response = await fetch...
            // setCaptain(response.data);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const value = {
        captain,
        isLoading,
        error,
        setCaptain,
        addCaptain,
        updateCaptain,
        getCaptain,
    };

    return (
        <CaptainDataContext.Provider value={value}>
            {children}
        </CaptainDataContext.Provider>
    );
};