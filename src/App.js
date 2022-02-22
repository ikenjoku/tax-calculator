import React from "react";
import { useTaxCalculator } from "./context/CalculatorProvider";
import {
  SelectField,
  Center,
  Output,
  Input,
  SpaceTop,
  SpaceBottom,
  InputField,
} from "./components/styles";

const ROUND = Math.round;

function App() {
  const {
    // output,
    memoizedOutput,
    currentGross,
    selectCountry,
    handleGrossChange,
    state: { loadingData, countryList },
  } = useTaxCalculator();
  const {
    employer: { healthInsurance, socialSecurity, payrollTax },
    employee: { socialSecurity: employeeSecurity, incomeTax },
  } = memoizedOutput;

  if (loadingData)
    return (
      <Center>
        <strong>LOADING DATA...</strong>
      </Center>
    );
  return (
    <div>
      <Input>
        <div>
          <p>Select your country: </p>
          <div>
            <SelectField
              name="country"
              disabled={!countryList.length}
              onChange={(e) => selectCountry(e.target.value)}
            >
              <option value="">Select one</option>
              {countryList.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </SelectField>
          </div>
        </div>
        <div>
          <p>Enter gross salary: </p>
          <div>
            <InputField
              type="number"
              name="gross"
              value={currentGross}
              onChange={(e) => handleGrossChange(e.target.value)}
            />
          </div>
        </div>
      </Input>
      <Output>
        <div>
          <SpaceBottom>Employer taxes</SpaceBottom>
          <div>
            <p>
              - Health Insurance: <strong>${ROUND(healthInsurance)}</strong>
            </p>
            <p>
              - Social Security: <strong>${ROUND(socialSecurity)}</strong>
            </p>
            <p>
              - Payroll Tax: <strong>${ROUND(payrollTax)}</strong>
            </p>
          </div>
          <SpaceTop>
            <p>
              - Total Cost:{" "}
              <strong>
                ${ROUND(healthInsurance + socialSecurity + payrollTax)}
              </strong>
            </p>
          </SpaceTop>
        </div>
        <div>
          <SpaceBottom>Employee taxes</SpaceBottom>
          <div>
            <p>
              - Social Security: <strong>${ROUND(employeeSecurity)}</strong>
            </p>
            <p>
              - Income Tax: <strong>${ROUND(incomeTax)}</strong>
            </p>
          </div>
          <SpaceTop>
            <p>
              - Net Salary:{" "}
              <strong>
                ${ROUND(currentGross - incomeTax - employeeSecurity)}
              </strong>
            </p>
          </SpaceTop>
        </div>
      </Output>
    </div>
  );
}

export default App;
