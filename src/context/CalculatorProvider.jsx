import React, { createContext, useContext, useReducer, useEffect } from "react";
import { actions } from "./CalculatorProvider.actions";
import { fetchSheet } from "../utils";
import { useState } from "react";

const {
  LOADED_DATA,
  LOADING_DATA,
  ERROR_LOADING_DATA,
  SELECT_COUNTRY,
  CLEAR_SELECTION,
} = actions;

export const initialState = {
  loadedData: null,
  loadingData: true,
  errorLoadingData: false,
  selectedCountry: null,
  selectedCalculator: null,
  countryList: [],
};

export const TaxCalculatorReducer = (state, { type, payload }) => {
  switch (type) {
    case LOADED_DATA: {
      return {
        ...state,
        loadedData: payload.loadedData,
        countryList: payload.countryList,
      };
    }
    case LOADING_DATA: {
      return {
        ...state,
        loadingData: payload,
      };
    }
    case ERROR_LOADING_DATA: {
      return {
        ...state,
        loadingData: false,
        errorLoadingData: true,
      };
    }
    case SELECT_COUNTRY: {
      return {
        ...state,
        selectedCalculator: payload.selection,
        selectedCountry: payload.name,
      };
    }
    case CLEAR_SELECTION: {
      return {
        ...state,
        selectedCalculator: null,
        selectedCountry: null,
      };
    }
    default:
      return state;
  }
};

const TaxCalculatorContext = createContext();

const useTaxCalculator = () => {
  const context = useContext(TaxCalculatorContext);
  if (!context) {
    console.error(" Please call within a CaluclatorProvider");
    throw new Error(
      "useTaxCalculator must be used within a CaluclatorProvider"
    );
  }
  return context;
};

const defaultOutput = {
  employer: {
    healthInsurance: 0,
    socialSecurity: 0,
    payrollTax: 0,
    totalCost: 0,
  },
  employee: {
    socialSecurity: 0,
    incomeTax: 0,
    netSalary: 0,
  },
};

const CalculatorProvider = (props) => {
  const [state, dispatch] = useReducer(TaxCalculatorReducer, initialState);

  const [currentGross, setCurrentGross] = useState("");
  const fetchInitialData = async () => {
    try {
      const loadedData = await fetchSheet();
      const countryList = loadedData.map((calculator) => calculator.country);
      dispatch({ type: LOADED_DATA, payload: { loadedData, countryList } });
      dispatch({ type: LOADING_DATA, payload: false });
    } catch (error) {
      dispatch({ type: ERROR_LOADING_DATA, payload: error });
    }
  };

  const selectCountry = (name) => {
    const selection = state.loadedData.find((item) => item.country === name);
    dispatch({ type: SELECT_COUNTRY, payload: { selection, name } });
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  const output = React.useMemo(() => {
    if (!currentGross || !state.selectedCalculator) {
      return defaultOutput;
    } else {
      const { employee, employer } = state.selectedCalculator;
      const applicablePayrollBand = employer["Payroll Tax"].bands.find(
        (bands) => currentGross >= bands.min && currentGross <= bands.max
      );
      const applicableIncomeBand = employee["Income Tax"].bands.find(
        (bands) => currentGross >= bands.min && currentGross <= bands.max
      );
      const result = {
        employer: {
          healthInsurance:
            (employer["Health Insurance"].percent * currentGross) / 100,
          socialSecurity:
            (employer["Social Security"].percent * currentGross) / 100,
          payrollTax: (applicablePayrollBand?.percent * currentGross) / 100,
          totalCost: 0,
        },
        employee: {
          socialSecurity:
            (employee["Social Security"].percent * currentGross) / 100,
          incomeTax: (applicableIncomeBand?.percent * currentGross) / 100,
          netSalary: 0,
        },
      };
      return result;
    }
  }, [currentGross, state.selectedCalculator]);

  return (
    <TaxCalculatorContext.Provider
      value={{
        state,
        dispatch,
        selectCountry,
        handleGrossChange: setCurrentGross,
        output,
        currentGross,
      }}
      {...props}
    />
  );
};

export { CalculatorProvider, useTaxCalculator, TaxCalculatorContext };
