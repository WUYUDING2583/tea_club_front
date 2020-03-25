import { actions as appActions } from "./app";
import url from "../../utils/url";
import { get, post, put, _delete } from "../../utils/request";
import { requestType } from "../../utils/common";

const initialState = {
    activities: new Array(),
    byActivities: new Object(),
    byActivityRules: new Object(),
    activityRuleTypes: new Array(),
    byActivityRuleTypes: new Object(),
}

export const types = {
    FETCH_ACTIVITIES_NAME_DESC: "ACTIVITY/FETCH_ACTIVITIES_NAME_DESC",
    FETCH_ACTIVITY_RULE_TYPES: "ACTIVITY/FETCH_ACTIVITY_RULE_TYPES",
    ////////////////////////////////////////
    FETCH_ACTIVITIES: "ACTIVITY/FETCH_ACTIVITIES", //
    TERMINAL_ACTIVITY: "ACTIVITY/TERMINAL_ACTIVITY",
    ADD_ACTIVITY: "ACTIVITY/ADD_ACTIVITY",
    ALTER_ACTIVITY: "ACTIVITY/ALTER_ACTIVITY",
};

export const actions = {
    //获取所有活动的名称和描述
    fetchActivitiesNameDesc: () => {
        return (dispatch) => {
            dispatch(appActions.startRequest());
            return get(url.fetchActivitiesNameDesc()).then((result) => {
                dispatch(appActions.finishRequest());
                if (!result.error) {
                    dispatch(fetchActivitiesNameDescSuccess(convertActivitiesToPlainStructure(result.data)));
                } else {
                    dispatch(appActions.setError(result.msg));
                    return Promise.reject(result.error);
                }
            })
        }
    },
    //获取所有活动规则类型
    fetchActivityRuleTypes: () => {
        return (dispatch) => {
            dispatch(appActions.startRequest());
            return get(url.fetchActivityRuleTypes()).then((result) => {
                dispatch(appActions.finishRequest());
                if (!result.error) {
                    dispatch(fetchActivityRuleTypesSuccess(convertActivityRuleTypeToPlainStructure(result.data)));
                } else {
                    dispatch(appActions.setError(result.msg));
                    return Promise.reject(result.error);
                }
            })
        }
    },
    //新增活动
    addActivity: (activity) => {
        return (dispatch) => {
            dispatch(appActions.startRequest());
            const params = { ...activity };
            return post(url.addActivity(), params).then((data) => {
                dispatch(appActions.finishRequest());
                if (!data.error) {//TODO
                    dispatch(addActivitySuccess(activity));
                    return Promise.resolve();
                } else {
                    dispatch(appActions.setError(data.error));
                    return Promise.reject(data.error);
                }
            })
        }
    },
    ///////////////////////////////////////////////////////////
    //获取所有活动信息
    fetchActivities: (reqType = requestType.retrieveRequest) => {
        return (dispatch) => {
            dispatch(appActions.startRequest(reqType));
            return get(url.fetchActivities()).then((data) => {
                dispatch(appActions.finishRequest(reqType));
                if (!data.error) {
                    dispatch(fetchActivitiesSuccess(convetActivitiesToPlainStructure(data.activities)));
                    return Promise.resolve();
                } else {
                    dispatch(appActions.setError(data.error));
                    return Promise.reject();
                }
            });
        }
    },
    terminalActivity: (uid, reqType = requestType.appRequest) => {
        return (dispatch) => {
            dispatch(appActions.startRequest(reqType));
            return get(url.terminalActivity()).then((data) => {
                dispatch(appActions.finishRequest(reqType));
                if (!data.error) {
                    dispatch(terminalActivitySuccess(uid));
                    return Promise.resolve();
                } else {
                    dispatch(appActions.setError(data.error));
                    return Promise.reject();
                }
            });
        }
    },
    alterActivityInfo: (activity) => {
        return (dispatch) => {
            dispatch(appActions.startRequest());
            const params = { activity };
            return get(url.addActivity(), params).then((data) => {
                dispatch(appActions.finishRequest());
                if (!data.error) {
                    dispatch(addActivitySuccess(convetActivitiesToPlainStructure(data.activities)));
                    return Promise.resolve();
                } else {
                    dispatch(actions.setError(data.error));
                    return Promise.reject(data.error);
                }
            })
        }
    }
}

const convertActivitiesToPlainStructure = (data) => {
    let activities = new Array();
    let byActivities = new Object();
    let byActivityRules = new Object();
    data.forEach((item) => {
        let activityRules = new Array();
        try {
            item.activityRules.forEach((rule) => {
                activityRules.push(rule.uid);
                if (!byActivityRules[rule.uid]) {
                    byActivityRules[rule.uid] = rule;
                }
            })
        } catch{
            activityRules = new Array();
        }
        activities.push(item.uid);
        if (!byActivities[item.uid]) {
            byActivities[item.uid] = { ...item, activityRules };
        }
    });
    return {
        activities,
        byActivities,
        byActivityRules,
    }
}

const fetchActivitiesNameDescSuccess = ({ activities, byActivities, byActivityRules }) => ({
    type: types.FETCH_ACTIVITIES_NAME_DESC,
    activities,
    byActivities, byActivityRules
})

const convertActivityRuleTypeToPlainStructure = (data) => {
    let activityRuleTypes = new Array();
    let byActivityRuleTypes = new Object();
    data.forEach(item => {
        activityRuleTypes.push(item.uid);
        if (!byActivityRuleTypes[item.uid]) {
            byActivityRuleTypes[item.uid] = item;
        }
    });
    return {
        activityRuleTypes,
        byActivityRuleTypes
    }
}

const fetchActivityRuleTypesSuccess = ({ activityRuleTypes, byActivityRuleTypes }) => ({
    type: types.FETCH_ACTIVITY_RULE_TYPES,
    activityRuleTypes,
    byActivityRuleTypes
});

const addActivitySuccess = (activity) => ({
    type: types.ADD_ACTIVITY,
    activity
});

/////////////////////////////////////////////////////////////
const convetActivitiesToPlainStructure = (data) => {
    let activities = new Array();
    let byActivities = new Object();
    let byActivityRules = new Object();
    data.forEach((item) => {
        let activityRules = new Array();
        item.activityRules.forEach((rule) => {
            activityRules.push(rule.uid);
            if (!byActivityRules[rule.uid]) {
                byActivityRules[rule.uid] = rule;
            }
        })
        activities.push(item.uid);
        if (!byActivities[item.uid]) {
            byActivities[item.uid] = { ...item, activityRules };
        }
    });
    return {
        activities,
        byActivities,
        byActivityRules,
    }
}

const terminalActivitySuccess = (uid) => ({
    type: types.TERMINAL_ACTIVITY,
    uid,
});



const alterActivitySuccess = ({ activities, byActivities, byActivityRules }) => ({
    type: types.ALTER_ACTIVITY,
    activities,
    byActivities,
    byActivityRules,
});

const fetchActivitiesSuccess = ({ activities, byActivities, byActivityRules }) => ({
    type: types.FETCH_ACTIVITIES,
    activities,
    byActivities,
    byActivityRules,
});

const reducer = (state = initialState, action) => {
    let byActivities;
    switch (action.type) {
        case types.FETCH_ACTIVITY_RULE_TYPES:
            return { ...state, activityRuleTypes: action.activityRuleTypes, byActivityRuleTypes: action.byActivityRuleTypes };
        case types.FETCH_ACTIVITIES_NAME_DESC:
        ////////////////////////////////////////////////////////////
        case types.FETCH_ACTIVITIES:
        // case types.ADD_ACTIVITY:
        case types.ALTER_ACTIVITY:
            return { ...state, activities: action.activities, byActivities: action.byActivities, byActivityRules: action.byActivityRules };
        case types.TERMINAL_ACTIVITY:
            // debugger
            byActivities = new Object();
            state.activities.forEach((uid) => {
                if (uid == action.uid) {
                    byActivities[uid] = { ...state.byActivities[uid], enforceTerminal: true };
                } else {
                    byActivities[uid] = state.byActivities[uid];
                }
            })
            return { ...state, byActivities }
        default:
            return state;
    }
}

export default reducer;

export const getActivities = (state) => state.activity.activities;
export const getByActivities = (state) => state.activity.byActivities;
export const getByActivityRules = (state) => state.activity.byActivityRules;
export const getActivityRuleTypes = (state) => state.activity.activityRuleTypes;
export const getByActivityRuleTypes = (state) => state.activity.byActivityRuleTypes;
