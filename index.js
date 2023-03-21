'use strict';

module.exports = function VisualFriendMarker(mod) {
    let onlineFriendIds = [];

    mod.hook('S_FRIEND_LIST', 1, event => {
        onlineFriendIds = event.friends.filter(friend => friend.online).map(friend => friend.playerId);
    });

    mod.hook('S_SPAWN_USER', mod.majorPatchVersion >= 108 ? 16 : 15, event => {
        if (onlineFriendIds.includes(event.playerId)) {
            event.colored = true;
            event.coloredMessage = `<font color="#00FF00">${event.name}</font>`;
        }
        return true;
    });
};