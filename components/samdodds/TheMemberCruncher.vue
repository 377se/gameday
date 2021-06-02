<template>
    <div v-if="$fetchState.pending"> <!-- PLACEHOLDERS -->
        <div class="uk-container uk-container-large uk-padding-small">
            <content-placeholders :rounded="true">
                <content-placeholders-img />
                <content-placeholders-heading />
            </content-placeholders>
        </div>
    </div>
    <div v-else v-editable="blok" class="uk-container">
        <h2>{{currentMembershipObject.Title}}</h2>
        <div class="uk-grid-small uk-child-width-expand@s uk-grid-match uk-margin-small-bottom" uk-grid> <!-- MEDLEMSINFO & PRISER -->
            <div>
                <div class="uk-padding-small account-container"> <!-- INFO -->
                    <h3 class="uk-margin-remove">{{ $getCMSEntry(global_labels, 'membership_', 'Medlemsinfo') }}</h3>
                    <div class="uk-margin-small-top">
                        <div v-if="currentMembershipObject.Account.Message" :class="{ 'uk-alert-success': currentMembershipObject.Account.IsActive, 'uk-alert-danger': !currentMembershipObject.Account.IsActive }" class="uk-padding-small uk-margin-small-top uk-margin-small-bottom">{{currentMembershipObject.Account.Message}}</div>
                        <div>{{ $getCMSEntry(global_labels, 'membership_', 'Medlemsnummer') }}: {{currentMembershipObject.Account.MembershipNumber}}</div>
                        <div>{{ $getCMSEntry(global_labels, 'membership_', 'Namn') }}: {{currentMembershipObject.Account.FirstName}} {{currentMembershipObject.Account.LastName}}</div>
                        <div v-if="currentMembershipObject.IsSelectable" class="uk-margin-small-top">
                            <div><input class="uk-checkbox" type="checkbox" :checked="currentMembershipObject.ExtendMembership">&nbsp;&nbsp;{{ currentMembershipObject.SelectableTitle }}</div>
                            <div style="line-height:1;"><small>{{ currentMembershipObject.SelectableInformation }}</small></div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div class="uk-padding-small prices-container"> <!-- PRISER -->
                    <h3 class="uk-margin-remove">{{ $getCMSEntry(global_labels, 'membership_', 'Medlemspriser') }}</h3>
                    <div class="uk-margin-small-top border-top">
                        <div v-for="(membership, index) in currentMembershipObject.Pricing.PriceList" :key="index">
                            <div class="uk-flex uk-flex-between"><div>{{ membership.Name }}</div> <div>{{ membership.Price }} {{ membership.Currency }}</div></div>
                        </div>
                    </div>
                    <div class="uk-margin-small-top uk-text-small">{{ currentMembershipObject.Pricing.Description }}</div>
                </div>
            </div>
        </div>
        <div class="uk-margin-medium-top uk-width-1-1 uk-width-2-3@m"> <!-- FAMILJEMEDLEMMAR -->
            <div>
                <h3 class="uk-margin-remove-bottom">{{ $getCMSEntry(global_labels, 'membership_', 'Familjemedlemmar') }}</h3>
                <p class="uk-margin-remove-top">Lägg till dina familjemedlemmar, så får de ett eget medlemsnummer
                som används vid anmälan till aktiviteter.</p>
                <div class="uk-margin-small-top uk-margin-medium-bottom"> <!-- SÖK MEDLEM -->
                    <h4 style="padding-bottom: 5px;" class="uk-margin-remove">{{ $getCMSEntry(global_labels, 'membership_', 'Sök befintlig medlem att lägga till som familjemedlem') }}</h4>
                        <div class="uk-grid uk-grid-small uk-child-width-expand@s" uk-grid> <!-- MEDLEMSNUMMER & POSTNR -->
                            <div>
                                <div class="uk-form-controls">
                                    <input
                                        v-model="currentFamilyMember.MembershipNumber"
                                        class="uk-input"
                                        type="number"
                                        :placeholder="$getCMSEntry(global_labels, 'membership_', 'Skriv in medlemsnummer')"
                                        name="MembershipNumber"
                                        required>
                                </div>
                                <div class="uk-width-1-1 uk-margin-remove" uk-tooltip="title: Men äru hält dömm i hövvää?; pos: bottom-left"><small>{{ $getCMSEntry(global_labels, 'membership_', 'Var hittar jag mitt medlemsnummer?') }}</small></div>
                            </div>
                            <div>
                                <div class="uk-form-controls">
                                <input
                                    v-model="currentFamilyMember.PostalCode"
                                    class="uk-input"
                                    type="number"
                                    :placeholder="$getCMSEntry(global_labels, 'membership_', 'Skriv in postnummer')"
                                    name="PostalCode"
                                    required>
                                </div>
                            </div>
                            <div>
                                <button id="search-button" class="uk-button uk-button-default uk-align-right" @click.prevent="findFamilyMember()"> <!-- SÖK FAMILJEMEDLEM -->
                                    {{ $getCMSEntry(global_labels, 'membership_', 'Sök') }}
                                </button>
                            </div>
                        </div>
                    <Alert
                        v-if="errors.length > 0"
                        :errorlist="errors"
                        message=""
                        :alertClass="alertClass"
                    />
                </div>
                <div> <!-- FAMILJE-LISTA -->
                    <div class="uk-margin-small-top" v-for="(familyMember, index) in currentMembershipObject.FamilyMembers" :key="index">
                        <div class="uk-flex uk-flex-between uk-flex-middle uk-margin-small-bottom"> <!-- RUBRIK & TA BORT -->
                            <h4 class="uk-margin-remove">{{ $getCMSEntry(global_labels, 'membership_', 'Familjemedlem') }} {{ index+1 }}</h4>
                            <button
                                v-if="!familyMember.IsActive"
                                class="uk-button uk-button-small uk-button-default uk-margin-small-left"
                                style="height: 25px; line-height:1;"
                                @click.prevent="currentMembershipObject.FamilyMembers.splice(index,1)"
                            >
                                {{ $getCMSEntry(global_labels, 'membership_', 'Ta bort familjemedlem') }}
                            </button>
                        </div>
                        <div class="uk-fieldset uk-grid uk-grid-small uk-grid uk-child-width-expand@s" uk-grid>
                            <div>
                                <div class="uk-form-controls">
                                    <div class="uk-inline uk-width-1-1">
                                        <span class="uk-form-icon uk-form-icon-flip" uk-icon="icon: check"></span>
                                        <input
                                            v-model="familyMember.FirstName"
                                            class="uk-input"
                                            type="text"
                                            :placeholder="$getCMSEntry(global_labels, 'membership_', 'Skriv in förnamn')"
                                            name="FirstName"
                                            required
                                        >
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div class="uk-form-controls">
                                    <div class="uk-inline uk-width-1-1">
                                        <span class="uk-form-icon uk-form-icon-flip" uk-icon="icon: check"></span>
                                        <input
                                            v-model="familyMember.LastName"
                                            class="uk-input"
                                            type="text"
                                            :placeholder="$getCMSEntry(global_labels, 'membership_', 'Skriv in efternamn')"
                                            name="LastName"
                                            required>
                                        </div>
                                </div>
                            </div>
                        </div>
                        <div class="uk-fieldset uk-grid uk-grid-small uk-child-width-expand@s" uk-grid>
                            <div>
                                <div class="uk-form-controls">
                                <input
                                    v-model="familyMember.Email"
                                    class="uk-input"
                                    type="text"
                                    :placeholder="$getCMSEntry(global_labels, 'membership_', 'Skriv in email')"
                                    name="Email"
                                >
                                </div>
                            </div>
                            <div>
                                <div class="uk-form-controls">
                                <input
                                    v-model="familyMember.Mobile"
                                    class="uk-input"
                                    type="text"
                                    :placeholder="$getCMSEntry(global_labels, 'membership_', 'Skriv in mobilnummer')"
                                    name="Mobile"
                                >
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="uk-margin uk-text-right"> <!-- LÄGG TILL FAMILJEMEDLEM KNAPP -->
                        <button
                            class="uk-button uk-button-small uk-button-default uk-margin-small-top"
                            @click.prevent="currentMembershipObject.FamilyMembers.push(emptyFamilyMember)"
                            >
                            {{ $getCMSEntry(global_labels, 'membership_', 'Lägg till familjemedlem') }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <button id="add-to-cart-button" class="uk-button uk-button-primary uk-margin-small-top" @click.prevent="addMembershipToCart()"> <!-- LÄGG I VARUKORG -->
            {{ $getCMSEntry(global_labels, 'membership_', 'Lägg i varukorg') }}
        </button>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Alert from '@/components/Alert'
import ButtonSubmit from '@/components/ButtonSubmit'

export default {
    components: {
        Alert,
        ButtonSubmit,
    },
    props: {
        blok: {
            type: Object,
            required: true,
        }
    },
    computed: {
        ...mapGetters({
            global_labels: 'labels'
        })
    },
    data(){
        return{
            emptyMembershipObject: [],
            currentMembershipObject: [],
            emptyFamilyMember: [],
            currentFamilyMember: [],
            errors: [],
            message: '',
            alertClass: '',
            success: false,
            isSubmitting: false
        }
    },
    methods: {
        async findFamilyMember() {
            var _this = this;
            _this.errors = []
            _this.isSubmitting = true
            await this.$axios.post('/webapi/'+this.$i18n.locale+'/BranchSe/FindFamilyMember', _this.currentFamilyMember)
            .then(function (res) {
                _this.isSubmitting = false
                try{
                    if (res.data.ErrorList!=null && res.data.ErrorList.length > 0) {
                        _this.message = ''
                        _this.alertClass = 'uk-alert-danger'
                        _this.errors = res.data.ErrorList
                    } else {
                        _this.errors = []
                        _this.alertClass = 'uk-alert-success'
                        _this.message = res.data.Message
                        _this.currentFamilyMember = res.data
                        _this.addMemberAsFamilyMember()
                        UIkit.scroll('#search-button').scrollTo('#add-to-cart-button')
                    }
                } catch(err) { console.log(err) }
            })
            .catch(function (error) {
                _this.isSubmitting = false
            console.log(error)
            })
        },
        addMemberAsFamilyMember() {
            this.emptyMembershipObject.FamilyMembers.push(this.currentFamilyMember)
        },
        async addMembershipToCart() {
            var _this = this;
            _this.errors = []
            _this.isSubmitting = true
            await this.$axios.post('/webapi/'+this.$i18n.locale+'/Cart/AddMembershipToCart', _this.emptyMembershipObject)
            .then(function (res) {
                _this.isSubmitting = false
                try{
                    if (res.data.ErrorList!=null && res.data.ErrorList.length > 0) {
                        _this.message = ''
                        _this.alertClass = 'uk-alert-danger'
                        _this.errors = res.data.ErrorList
                    } else {
                        _this.errors = []
                        _this.alertClass = 'uk-alert-success'
                        _this.message = res.data.Message
                        _this.updateCart()
                    }
                } catch(err) {
                    console.log(err)
                }
            })
            .catch(function (error) {
                _this.isSubmitting = false
                console.log(error)
            })
        },
        async updateCart(){
            var _this = this
            await this.$axios.$get('/webapi/'+this.$i18n.locale+'/cart/Get')
            .then(res => {
                _this.$store.commit('basket/add', res)
                _this.$cookies.set('session', res.SessionId)
                _this.$axios.setHeader('x-session', res.SessionId)
            })
            .catch(function (error) {
                console.log(error)
            })
        },
    },
    async fetch() {
        try {
            let [ emptymembershipobject, emptyfamilymember ] = await Promise.all([
                this.$axios.$get('/webapi/BranchSe/GetEmptyMembershipObject'),
                this.$axios.$get('/webapi/BranchSe/GetEmptyFamilyMember'),
            ]);
                this.emptyMembershipObject = emptymembershipobject
                this.currentMembershipObject = emptymembershipobject
                this.emptyFamilyMember = emptyfamilymember
                this.currentFamilyMember = emptyfamilymember
        } catch (err) {
            console.log(err);
        }
    },
}
</script>

<style lang="scss">
    .account-container {
        background-color: #eee;
    }
    .prices-container {
        background-color: #eee;
    }
</style>