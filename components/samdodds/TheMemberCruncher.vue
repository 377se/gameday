<template>
    <div v-if="$fetchState.pending">
        <div class="uk-container uk-container-large uk-padding-small">
            <content-placeholders :rounded="true">
                <content-placeholders-img />
                <content-placeholders-heading />
            </content-placeholders>
        </div>
    </div>
    <div v-else v-editable="blok" class="uk-container">
        <h2>{{emptyMembershipObject.Title}}</h2>
        <div> <!-- FAMILJEMEDLEMMAR -->
            <div class="uk-margin">
              <button
                class="uk-button uk-button-primary uk-margin-small-top"
                @click.prevent="emptyMembershipObject.FamilyMembers.push(emptyFamilyMember)"
                >
                {{ $getCMSEntry(global_labels, 'tom', 'Lägg till familjemedlem') }}
              </button>
            </div>
            <div v-if="emptyMembershipObject.FamilyMembers.length > 0">
                <h3>Sök befintlig medlem att lägga till som familjemedlem</h3>
                <form
                    v-if="!success"
                    method="post"
                    @submit.prevent="findFamilyMember">
                    <fieldset class="uk-fieldset uk-flex uk-flex-between uk-width-1-1 uk-width-2-3@m">
                    <div class="uk-width-1-3 uk-margin-small-right">
                        <div class="uk-form-controls">
                        <input
                            v-model="tempFamilyMember.MembershipNumber"
                            class="uk-input"
                            type="text"
                            :placeholder="$getCMSEntry(global_labels, 'membership_member_id_placeholder', 'Skriv in medlemsnummer')"
                            name="MembershipNumber"
                            required>
                        </div>
                    </div>
                    <div class="uk-width-1-3 uk-margin-small-right">
                        <div class="uk-form-controls">
                        <input
                            v-model="tempFamilyMember.PostalCode"
                            class="uk-input"
                            type="text"
                            :placeholder="$getCMSEntry(global_labels, 'membership_postal_code_placeholder', 'Skriv in postnummer')"
                            name="PostalCode"
                            required>
                        </div>
                    </div>
                    <div class="uk-width-1-3">
                        <ButtonSubmit
                        :is-submitting="isSubmitting"
                        theme="uk-button-primary"
                        :button-text="$getCMSEntry(global_labels, 'membership_search', 'Sök')"
                        :is-submit="true"
                        />
                    </div>
                    </fieldset>
                </form>
                <Alert
                v-if="errors.length > 0"
                :errorlist="errors"
                message=""
                :alertClass="alertClass"
                />
                <h3 class="uk-margin-remove-bottom">{{ $getCMSEntry(global_labels, 'tom', 'Familjemedlemmar') }}</h3>
                <p class="uk-margin-remove-top">Lägg till dina familjemedlemmar, så får de ett eget medlemsnummer
                som används vid anmälan till aktiviteter.</p>
                <div class="uk-margin-small-bottom" v-for="(familyMember, index) in emptyMembershipObject.FamilyMembers" :key="index">
                    <form
                        method="post"
                        @submit.prevent="updateFamilyMember">
                        <div class="uk-flex uk-flex-middle uk-margin-small-bottom">
                            <h4 class="uk-margin-remove">{{ $getCMSEntry(global_labels, 'tom', 'Familjemedlem') }} {{ index+1 }}</h4>
                            <button
                                class="uk-button uk-button-small uk-button-primary uk-margin-small-left"
                                style="height: 25px; line-height:1;"
                                @click.prevent="emptyMembershipObject.FamilyMembers.splice(index,1)"
                            >
                                {{ $getCMSEntry(global_labels, 'tom', 'Ta bort familjemedlem') }}
                            </button>
                        </div>
                        <fieldset class="uk-fieldset uk-flex uk-flex-between uk-width-2-3">
                        <div class="uk-width-1-2 uk-margin-small-right">
                            <div class="uk-form-controls">
                            <input
                                v-model="familyMember.FirstName"
                                class="uk-input"
                                type="text"
                                :placeholder="$getCMSEntry(global_labels, 'tom', 'Skriv in förnamn')"
                                name="FirstName"
                                required>
                            </div>
                        </div>
                        <div class="uk-width-1-2 uk-margin-small-right">
                            <div class="uk-form-controls">
                            <input
                                v-model="familyMember.LastName"
                                class="uk-input"
                                type="text"
                                :placeholder="$getCMSEntry(global_labels, 'tom', 'Skriv in efternamn')"
                                name="LastName"
                                required>
                            </div>
                        </div>
                        </fieldset>
                        <fieldset class="uk-fieldset uk-flex uk-flex-between uk-width-2-3 uk-margin-small-top">
                        <div class="uk-width-1-2 uk-margin-small-right">
                            <div class="uk-form-controls">
                            <input
                                v-model="familyMember.Email"
                                class="uk-input"
                                type="text"
                                :placeholder="$getCMSEntry(global_labels, 'tom', 'Skriv in email')"
                                name="Email"
                            >
                            </div>
                        </div>
                        <div class="uk-width-1-2 uk-margin-small-right">
                            <div class="uk-form-controls">
                            <input
                                v-model="familyMember.Mobile"
                                class="uk-input"
                                type="text"
                                :placeholder="$getCMSEntry(global_labels, 'tom', 'Skriv in mobilnummer')"
                                name="Mobile"
                            >
                            </div>
                        </div>
                        </fieldset>
                    </form>
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
            emptyFamilyMember: [],
            tempFamilyMember: [],
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
            await this.$axios.post('/webapi/'+this.$i18n.locale+'/BranchSe/FindFamilyMember', _this.tempFamilyMember)
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
                        _this.tempFamilyMember = res.data
                        _this.addMemberAsFamilyMember()
                    }
                } catch(err) { console.log(err) }
            })
            .catch(function (error) {
                _this.isSubmitting = false
            console.log(error)
            })
        },
        addMemberAsFamilyMember() {
            this.emptyMembershipObject.FamilyMembers.push(this.tempFamilyMember)
        },
    },
    async fetch() {
        try {
            let [ emptymembershipobject, emptyfamilymember ] = await Promise.all([
                this.$axios.$get('/webapi/BranchSe/GetEmptyMembershipObject'),
                this.$axios.$get('/webapi/BranchSe/GetEmptyFamilyMember'),
            ]);
                this.emptyMembershipObject = emptymembershipobject
                this.emptyFamilyMember = emptyfamilymember
                this.tempFamilyMember = emptyfamilymember
        } catch (err) {
            console.log(err);
        }
    },
}
</script>

<style>

</style>