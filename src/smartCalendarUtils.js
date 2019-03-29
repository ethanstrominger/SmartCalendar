import ICAL from 'ical.js';
import moment from 'moment';
function getICalEvents(iCalData) {
    var jcal = ICAL.parse(iCalData);
    var vcal = new ICAL.Component(jcal);
    var vevents = vcal.getAllSubcomponents("vevent");
    return vevents.map(getICalEventAtrributes);
}
;
function getICalEventAtrributes(vevent) {
    var element = {
        uid: vevent.getFirstPropertyValue("uid"),
        name: vevent.getFirstPropertyValue("summary"),
        starttime: moment(vevent.getFirstPropertyValue("dtstart")).format(),
        endtime: moment(vevent.getFirstPropertyValue("dtend")).format(),
        description: vevent.getFirstPropertyValue("description")
    };
    return element;
}
;

export {getICalEvents};