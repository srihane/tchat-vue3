<template lang="fr">

<div class="offcanvas offcanvas-start" tabindex="-1" id="userList" aria-labelledby="offcanvasWithBackdropLabel">
    
    <div class="offcanvas-header">
        <div class="backdrop-sidenav">
            <h2 class="white d-flex justify-content-center">Utilisateurs</h2>
        </div>
    </div>

    <div class="side-menu">
        <span v-for="us in users">
            <a href="#">
            <div class="side-menu-link"><div class="container">{{us.user}}</div></div>
            </a>
        </span>
    </div>

</div>


<div v-if="!joined" class='container d-flex justify-content-center'>
    <div>
        <h2>Connexion au Tchat</h2>
        <div class="input-group mb-3" style="width: 300px;">
            <input v-model="user" v-on:keyup.enter="userConnected()" type="text" class="form-control" placeholder="Pseudo" aria-label="Recipient's username" aria-describedby="basic-addon2">
            <span class="btn btn-primary" id="basic-addon2" v-on:click="userConnected()"><i class="fa-solid fa-arrow-right-to-bracket"></i></span>
        </div>
    </div>
</div>


<!--
<div class="container row">
    <div class="col">
        <a href="https://rihane-samy.fr" class="btn btn-primary"><i class="fa-solid fa-arrow-left-long"></i></a>
    </div>

    <div class="col">
        <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#userList" aria-controls="offcanvasWithBackdrop"><i class="fa-solid fa-users"></i>  {{users.length}}</button>
    </div>
</div>
-->


    <div v-if="joined" id="chat-box">

        <div id="msg-box" style="padding: 10px;">
            <div v-for="msg in messages.slice().reverse()">

                <div v-if="msg.user == this.user" class="myMessage d-flex">
                    <p><strong>{{msg.user}} :</strong> {{msg.text}}</p>
                </div>
                
                <div v-if="msg.user != this.user" class="othersMessage">
                    <p><strong>{{msg.user}} :</strong> {{msg.text}}</p>
                </div>
                
            </div>
        </div>


        <div id="text-box" class="input-group">
            <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#userList" aria-controls="offcanvasWithBackdrop"><i class="fa-solid fa-users"></i>  {{users.length}}</button>
            <input v-model="text" v-on:keyup.enter="sendMessage()" type="text" class="form-control" placeholder="Message ...">
            <span class="btn btn-primary" v-on:click="sendMessage()"><i class="fa-solid fa-paper-plane"></i></span>
        </div>

    </div>

</template>

<script>
// Socket.io
import io from 'socket.io-client'


export default {
    name:"chat",
    data() {
        return {
            joined: false,
            user: "",
            data: {},
            users: [],
            messages: [],
            text: "",
        }
    },
    methods: {
        userConnected() {
            console.log("New user connected")
            console.log(this.$store.state.globalconfig.server)
            this.socketInstance = io(this.$store.state.globalconfig.server)
            //this.socketInstance = io("https://rihane-samy.fr:1000")
            this.joined = true; 

                // Send the messages to the server
                this.socketInstance.emit('newconnected', this.user)
                
                this.socketInstance.on(
                    "newconnected", (data) => {
                        this.users = data
                        console.log(data)
                    }
                )
                

                    this.socketInstance.on(
                        "message:received", (data) => {
                            this.messages = this.messages.concat(data)
                        }
                    )
    
        },
        sendMessage() {
            this.addMessage();
            this.text = ""
        },
        addMessage() {

            const message = {
                date: new Date().getTime(),
                text: this.text,
                user: this.user
            }

            // Add the new message to the list of messages
            this.messages = this.messages.concat(message)

            // Send the messages to the server
            this.socketInstance.emit('message', message)

        }
    }
}
</script>

<style>


</style>