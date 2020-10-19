import axios from "axios";

// var passport       = require("passport");
// const refresh = require("passport-oauth2-refresh");
// var twitchStrategy = require("passport-twitch").Strategy;

const service = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    withCredentials: true, // Cookie is sent to client when using this service. (used for session)
    headers: {
        "Client-ID": process.env.TWITCH_CLIENT_ID
    }
});

function errorHandler(error) {
    if (error.response.data) {
        console.log(error.response && error.response.data);
        throw error;
    }
    throw error;
}

export default {
    service,

    signup(userInfo) {
        return service
            .post("/api/auth/signup", userInfo)
            .then((res) => res.data)
            .catch(errorHandler);
    },

    signin(userInfo) {
        return service
            .post("/api/auth/signin", userInfo)
            .then((res) => res.data)
            .catch(errorHandler);
    },

    isLoggedIn() {
        return service
            .get("/auth/isLoggedIn")
            .then((res) => res.data)
            .catch(errorHandler);
    },

    logout() {
        return service
            .get("/auth/logout")
            .then((res) => res.data)
            .catch(errorHandler);
    },

    getItems() {
        return service
            .get("/api/items")
            .then((res) => res.data)
            .catch(errorHandler);
    },

    testPouet() {
        return service.get("https://id.twitch.tv/oauth2/authorize?client_id=m3vo1t7dvgtkfb9korsfpzlgjrh5vk&redirect_uri=http://localhost:8080&response_type=token&scope=user:read:email").then(apires => console.log(apires));
    },

    getStreamer() {
        return service
            .get("/user/streamer")
            .then((res) => res.data)
            .catch(errorHandler);
    },

    getFilteredStreamer(data) {
        return service
        .get("/user/streamer/search/" + data)
        //.then(res => res.data)
        .then(res => res.data)
        .catch(errorHandler);
    },

    getUserFollow() {
        return service
            .get("/user/follow")
            .then((res) => res.data)
            .catch(errorHandler);
    },

    populateStreamer(id) {
        return service
            .get("/user/streamer/" + id)
            .then((res) => res.data)
            .catch(errorHandler);
    },

    addFollowStreamer(id) {
        return service
            .post("/user/streamer/" + id)
            .then((res) => res.data)
            .catch(errorHandler);
    },

    removeFollowStreamer(id) {
        return service
            .delete("/user/streamer/" + id)
            .then((res) => res.data)
            .catch(errorHandler);
    },


    ///// Schedule part

    createScheduleOne(data) {
        console.log(data);
        return service.post("/schedule/create", data)
        .then((res) => res.data)
    },

    getSchedule() {
        return service.get("/schedule/get")
        .then((res) => res.data)
        .catch(errorHandler);
    },


    deleteScheduleOne(id){
        return service.delete("/schedule/delete/"+id)
        .then((res) => res.data)
    }

};