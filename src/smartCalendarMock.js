export {
    undefineUseMockData,
    turnOnMockData,
    turnOffMockData, 
    setMockDataEnvVariable, 
    useMockData, 
    restoreOriginalMockValues, 
    saveOriginalMockValues
}

function _setUseMockData(value) {
    window.useMockData = value;
    return value;
}

function _getUseMockData(value) {
    return window.useMockData;
}
function _setUseMockDataFromEnvVariable() {
    let envValue = process.env.smartcalendar_usemockdata;
    if (typeof(envValue)=="undefined") {
        turnOffMockData();
    } else if (envValue == "Y") {
        turnOnMockData();
    } else {
        turnOffMockData();
    }
}

// Used for testing only
function undefineUseMockData() {
    _setUseMockData (undefined);
}

function turnOnMockData() {
    _setUseMockData(true);
}

function turnOffMockData() {
    _setUseMockData (false);
}

function restoreOriginalMockValues() {
    window.useMockData = window.original_useMockData;
    process.env.smartcalendar_usemockdata = window.original_mockDataEnvValue;
}

function saveOriginalMockValues() {
    window.original_useMockData = _getUseMockData();
    window.original_mockDataEnvValue = process.env.smartcalendar_usemockdata;
}

function setMockDataEnvVariable(value) {
    process.env.smartcalendar_usemockdata = value;
    return value;
}

function useMockData() {
    if (typeof(window.useMockData)=="undefined") {
        _setUseMockDataFromEnvVariable();
    }
    return window.useMockData;
}