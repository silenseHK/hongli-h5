import UniSocket from 'js_sdk/UpYou-websocket/uni.socket/lib/uni.socket';
import baseUrl from './baseUrl';

const socket = {
    socketInstance: null,
    open() {
        const ping = uni.getStorageSync('ping');
        if (!ping) return;
        if (Object.prototype.toString.call(this.socketInstance) !== "[object Null]") return;
        this.socketInstance = new UniSocket({
            url: baseUrl.wsUrl + ping,
            heartBeatMsg: 'ping.ping:0',
            heartRate: 10000
        });
        this.socketInstance.on('error', ()=>{
            console.log('socket open err')
        })
    },
    close() {
        if (Object.prototype.toString.call(this.socketInstance) !== "[object Null]") {
            this.socketInstance.killApp();
            this.socketInstance.close();
            this.socketInstance = null;
        }
    }
};

export {
    socket
}