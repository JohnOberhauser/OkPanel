"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationsSchema = exports.NOTIFICATION_POSITIONS = exports.NotificationsPosition = void 0;
var NotificationsPosition;
(function (NotificationsPosition) {
    NotificationsPosition["LEFT"] = "left";
    NotificationsPosition["RIGHT"] = "right";
    NotificationsPosition["CENTER"] = "center";
})(NotificationsPosition || (exports.NotificationsPosition = NotificationsPosition = {}));
exports.NOTIFICATION_POSITIONS = Object.values(NotificationsPosition);
exports.notificationsSchema = {
    name: 'notifications',
    type: 'object',
    description: 'Notification pop‑up behaviour.',
    children: [
        {
            name: 'position',
            type: 'enum',
            enumValues: exports.NOTIFICATION_POSITIONS,
            default: NotificationsPosition.RIGHT,
            description: 'Screen edge where notification bubbles appear.',
        },
        {
            name: 'respectExclusive',
            type: 'boolean',
            default: true,
            description: 'Whether to avoid overlaying exclusive zones declared by widgets.',
        },
    ],
};
