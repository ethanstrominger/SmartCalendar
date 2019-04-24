import { undefineUseMockData, setMockDataEnvVariable, useMockData, saveOriginalMockValues, restoreOriginalMockValues, turnOnMockData, turnOffMockData } from '../../smartCalendarMock';
describe("Testing set mock", () => {



    test("Setting mock based on env variables", () => {
        afterAll(() => restoreOriginalMockValues());
        saveOriginalMockValues();
      
        function testSetMock(envValue, truthValue) {
            setMockDataEnvVariable(envValue);
            const retval = useMockData();
            expect([envValue, retval]).toEqual([envValue, truthValue]);
            restoreOriginalMockValues();
        }
        testSetMock(undefined, false);
        testSetMock("Y", true);
        testSetMock("N", false);
        testSetMock("X", false);
    });

    test("Setting mock based on functions", () => {
        afterAll(() => restoreOriginalMockValues());
        saveOriginalMockValues();
      
        function testSetMock(envValue, functionName, truthValue) {
            setMockDataEnvVariable(envValue);
            functionName();
            const retval = useMockData();
            expect([envValue, functionName.name, retval]).toEqual([envValue, functionName.name, truthValue]);
            restoreOriginalMockValues();
        }

        testSetMock("N", turnOnMockData, true);
        testSetMock("Y", turnOffMockData, false);
        testSetMock(undefined, turnOffMockData, false);
        testSetMock("N", undefineUseMockData, false);
        testSetMock("Y", undefineUseMockData, true);
    });

});