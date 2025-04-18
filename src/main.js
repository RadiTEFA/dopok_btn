import { createApp } from 'vue'
import App from './App.vue'

import MenuButton from './components/UI/MenuButton'
import TitlePage from './components/UI/TitlePage.vue'
import ThTable from './components/UI/ThTable.vue'
import TdTable from './components/UI/TdTable.vue'
import RedButton from './components/UI/RedButton.vue'
import BlueButton from './components/UI/BlueButton.vue'
import ConfirmDialog from './components/UI/ConfirmDialog.vue'
import WarningMessage from './components/UI/WarningMessage.vue'

const app =createApp(App)

app.config.unwrapInjectedRef = true

app.component('menu-button', MenuButton)
app.component('title-page', TitlePage)
app.component('th-table', ThTable)
app.component('td-table', TdTable)
app.component('red-button', RedButton)
app.component('blue-button', BlueButton)
app.component('confirm-dialog', ConfirmDialog)
app.component('warning-message', WarningMessage)

app.mount('#app')
