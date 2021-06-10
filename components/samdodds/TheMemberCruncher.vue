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
        <div
            class="uk-width-1-1 uk-flex uk-middle uk-padding-small"
            style="background:#fff;"
            uk-sticky="offset:117">
            <div
                class="uk-width-expand uk-text-small"
                >
                <h4>Detta lägger du i varukorgen</h4>
                <div v-if="currentMembershipObject.IsSelectable">
                    <div><input class="uk-checkbox" type="checkbox" v-model="currentMembershipObject.ExtendMembership">&nbsp;&nbsp;{{ currentMembershipObject.SelectableTitle }}</div>
                    <div style="line-height:1;"><small>{{ currentMembershipObject.SelectableInformation }}</small></div>
                </div>
                <div
                    v-else>
                    <strong>1</strong> Medlemsskap 21/22 (299kr)
                </div>
                <div>
                    <strong v-if="currentMembershipObject.FamilyMembers!=null">{{ currentMembershipObject.FamilyMembers.length }}</strong><strong v-else>0</strong> Familjemedlemmar (99kr/st) <a href="#familymembers">Lägg till fler</a>
                </div>
            </div>
            <div>
                <button 
                    id="add-to-cart-button" 
                    class="uk-button uk-button-primary uk-align-right uk-margin-remove-bottom" 
                    @click.prevent="addMembershipToCart()"
                    >
                    <!-- LÄGG I VARUKORG -->
                    {{ $getCMSEntry(global_labels, 'membership_', 'Lägg i varukorgen') }}
                </button><br>
            </div>
        </div>
        <h2>{{currentMembershipObject.Title}}</h2>
        <div
            class="uk-grid uk-grid-small uk-child-width-expand@s uk-grid-match uk-margin-small-bottom" uk-grid> <!-- MEDLEMSINFO & PRISER -->
            <div
                v-if="currentMembershipObject.Account"
                >
                <div class="uk-padding-small account-container"> <!-- INFO -->
                    <h3 class="uk-margin-remove">{{ $getCMSEntry(global_labels, 'membership_', 'Medlemsinfo') }}</h3>
                    <div class="uk-margin-small-top">
                        <div v-if="currentMembershipObject.Account.Message" :class="{ 'uk-alert-success': currentMembershipObject.Account.IsActive, 'uk-alert-danger': !currentMembershipObject.Account.IsActive }" class="uk-padding-small uk-margin-small-top uk-margin-small-bottom">{{currentMembershipObject.Account.Message}}</div>
                        <div>{{ $getCMSEntry(global_labels, 'membership_', 'Medlemsnummer') }}: {{currentMembershipObject.Account.MembershipNumber}}</div>
                        <div>{{ $getCMSEntry(global_labels, 'membership_', 'Namn') }}: {{currentMembershipObject.Account.FirstName}} {{currentMembershipObject.Account.LastName}}</div>
                        <div v-if="false && currentMembershipObject.IsSelectable" class="uk-margin-small-top">
                            <div><input class="uk-checkbox" type="checkbox" v-model="currentMembershipObject.ExtendMembership">&nbsp;&nbsp;{{ currentMembershipObject.SelectableTitle }}</div>
                            <div style="line-height:1;"><small>{{ currentMembershipObject.SelectableInformation }}</small></div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                v-else>
                <div class="uk-padding-small account-container"> <!-- INFO -->
                    <h3 class="uk-margin-remove">{{ $getCMSEntry(global_labels, 'membership_become_member_how', 'Hur gör jag?') }}</h3>
                    <div class="uk-margin-small-top">
                        Vill du endast köpa ett medlemsskap klickar du bara på "Lägg i varukorgen".
                        <br>
                        Har du familjemedlemmar som du också vill anmäla då lägger du till dessa i formuläret nedan innan du lägger i varukorgen.
                    </div>
                </div>
            </div>
            <div
                v-if="currentMembershipObject.Pricing">
                <div class="uk-padding-small prices-container"> <!-- PRISER -->
                    <h3 class="uk-margin-remove">{{ $getCMSEntry(global_labels, 'membership_', 'Medlemspriser') }}</h3>
                    <div 
                        class="uk-margin-small-top border-top">
                        <div v-for="(membership, index) in currentMembershipObject.Pricing.PriceList" :key="index">
                            <div class="uk-flex uk-flex-between"><div>{{ membership.Name }}</div> <div>{{ membership.Price }} {{ membership.Currency }}</div></div>
                        </div>
                    </div>
                    <div class="uk-margin-small-top uk-text-small">{{ currentMembershipObject.Pricing.Description }}</div>
                </div>
            </div>
        </div>
        <div 
            id="familymembers"
            class="uk-margin-medium-top uk-width-1-1 uk-width-2-3@m"> <!-- FAMILJEMEDLEMMAR -->
            <div>
                <h3 
                    class="uk-margin-remove-bottom">{{ $getCMSEntry(global_labels, 'membership_family_members', 'Familjemedlemmar') }}</h3>
                <p class="uk-margin-remove-top">Här kan du lägga till dina familjemedlemmar. En familjemedlem är skriven på samma adress som huvudkontot. Alla familjemedlemmar får ett eget konto hos LFC.se</p>
                <div class="uk-margin-small-top uk-margin-medium-bottom"> <!-- SÖK MEDLEM -->
                    <h4 style="padding-bottom: 5px;" class="uk-margin-remove">{{ $getCMSEntry(global_labels, 'membership_family_member_search', 'Sök befintlig medlem att lägga till som familjemedlem') }}</h4>
                        <div class="uk-grid uk-grid-small uk-child-width-expand@s" uk-grid> <!-- MEDLEMSNUMMER & POSTNR -->
                            <div>
                                <div class="uk-form-controls">
                                    <input
                                        v-model="currentFamilyMember.MembershipNumber"
                                        class="uk-input"
                                        type="number"
                                        :placeholder="$getCMSEntry(global_labels, 'membership_number', 'Skriv in medlemsnummer')"
                                        name="MembershipNumber"
                                        required>
                                </div>
                                <div class="uk-width-1-1 uk-margin-remove">
                                    <small><a href="javascript:void()" :onclick="'UIkit.modal.alert(\''+$getCMSEntry(global_labels, 'membership_where_to_find_number', '<pNär du vill lägga till en familjemedlem kan du söka fram denna person via medlemsnummer och postnummer om det är så att denne redan finns i supporterklubbens medlemsregister.</p><p>Medlemsnumret hittar ni genom att logga in på LFC.se och gå till “Mina sidor”. Alternativt öppnar ni Cardskipper och tittar på det digitala medlemskortet.</p><p>Ni kan alltid kontakta oss på info@samdodds.com för hjälp kring detta.</p>\'')+')'">{{ $getCMSEntry(global_labels, 'membership_where_to_find_number_label', 'Var hittar jag familjemedlemmens medlemsnummer?') }}</a></small>
                                </div>
                            </div>
                            <div>
                                <div class="uk-form-controls">
                                <input
                                    v-model="currentFamilyMember.PostalCode"
                                    class="uk-input"
                                    type="number"
                                    :placeholder="$getCMSEntry(global_labels, 'membership_postal_code', 'Skriv in postnummer')"
                                    name="PostalCode"
                                    required>
                                </div>
                            </div>
                            <div>
                                <button id="search-button" class="uk-button uk-button-secondary uk-align-right" @click.prevent="findFamilyMember()"> <!-- SÖK FAMILJEMEDLEM -->
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
                <div
                    class="uk-list uk-list-striped"> <!-- FAMILJE-LISTA -->
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
                                        <label class="uk-label">{{ $getCMSEntry(global_labels, 'membership_firstname', 'Skriv in förnamn') }}<span class="form-required">*</span></label>
                                        <input
                                            v-model="familyMember.FirstName"
                                            class="uk-input"
                                            type="text"
                                            :placeholder="$getCMSEntry(global_labels, 'membership_firstname', 'Skriv in förnamn')"
                                            name="FirstName"
                                            required
                                        >
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div class="uk-form-controls">
                                    <div class="uk-inline uk-width-1-1">
                                        <label class="uk-label">{{ $getCMSEntry(global_labels, 'membership_lastname', 'Skriv in efternamn') }}<span class="form-required">*</span></label>
                                        <input
                                            v-model="familyMember.LastName"
                                            class="uk-input"
                                            type="text"
                                            :placeholder="$getCMSEntry(global_labels, 'membership_lastname', 'Skriv in efternamn')"
                                            name="LastName"
                                            required>
                                        </div>
                                </div>
                            </div>
                        </div>
                        <div class="uk-fieldset uk-grid uk-grid-small uk-child-width-expand@s" uk-grid>
                            <div>
                                <div class="uk-form-controls">
                                <label class="uk-label">{{ $getCMSEntry(global_labels, 'membership_email', 'Skriv in email') }}</label>
                                <input
                                    v-model="familyMember.Email"
                                    class="uk-input"
                                    type="text"
                                    :placeholder="$getCMSEntry(global_labels, 'membership_email', 'Skriv in email')"
                                    name="Email"
                                >
                                </div>
                            </div>
                            <div>
                                <div class="uk-form-controls">
                                <label class="uk-label">{{ $getCMSEntry(global_labels, 'membership_mobile', 'Skriv in mobilnummer') }}</label>
                                <input
                                    v-model="familyMember.Mobile"
                                    class="uk-input"
                                    type="text"
                                    :placeholder="$getCMSEntry(global_labels, 'membership_mobile', 'Skriv in mobilnummer')"
                                    name="Mobile"
                                >
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                    <div class="uk-margin uk-text-right"> <!-- LÄGG TILL FAMILJEMEDLEM KNAPP -->
                        <button
                            class="uk-button uk-button-small uk-button-secondary uk-margin-small-top"
                            @click.prevent="currentMembershipObject.FamilyMembers.push(emptyFamilyMember)"
                            >
                            {{ $getCMSEntry(global_labels, 'membership_', 'Lägg till familjemedlem') }}
                        </button>
                    </div>
            </div>
        </div>
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

<style lang="scss" scoped>
    .uk-label{
        background:transparent;
        text-transform:none;
        color: inherit;
    }
    .account-container {
        background-color: #eee;
    }
    .prices-container {
        background-color: #eee;
    }
</style>