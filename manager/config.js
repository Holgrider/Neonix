const config = ({
    token: "MTA4OTQzMTU1MDgyOTAxOTEzOA.GSeajI.QPRnG7yb4nENpgjw_VlSCgDXVzPI2Pm3UhyBDA",
    autoCatchAI: true, //Toggle autocatcher with AI. [TOGGLE BOTH false TO DISABLE CATCHER]
    autoCatchHint: false, //Toggle autocatcher with hint [DONT TURN BOTH ON]
    poketwo: `716390085896962058`,//This was used for testing purposes
    admins: ["1089431550829019138"],
    spam: {
        toggle: true, //Toggle spam
        channel: `1090229417810333736`, //Spam  channel
        interval: 2500 //Spam interval in ms
    },
    accountConfig: { //Don't play with this if you don't know what you are doing.
        checkUpdate: false,
        syncStatus: true,
        restTimeOffset: 500,
        restRequestTimeout: 15000,
        restGlobalRateLimit: 50,
        messageCreateEventGuildTimeout: 100
    }
})

module.exports = config;