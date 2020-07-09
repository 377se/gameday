<template>
  <div
    v-if="article.AddOn">
    <div class="checkbox">
        <label>
          <input type="checkbox" v-model="showNameNumber"  /> Namn- och/eller nummer
        </label>
    </div>
    <form
      v-if="showNameNumber">
        <select class="form-control" v-model="article.">
            <option value="-1">{{{dictAddTo.pick-player}}}</option>
            {{#AddOn.Names}}
            <option value="{{Name}};{{Number}}">{{Name}}, {{Number}}</option>
            {{/AddOn.Names}}
        </select>
        </div>
        <div class="row form-group">
            <div class="col-xs-6">
                <label>
                    {{{dictAddTo.print-name}}}<br /> (+ {{AddOn.DisplayPriceName}})
                </label>
                <input name="Name" class="form-control" type="text" can-value="addOn.Name" />
            </div>
            <div class="col-xs-6">
                <label>
                    {{{dictAddTo.print-number}}}<br /> (+ {{AddOn.DisplayPriceNumber}})
                </label>
                <input name="Number" class="form-control" type="text" can-value="addOn.Number" />
            </div>
        </div>
    </form>
    {{/if}}
    {{#if showPatches}}
    <div class="checkbox">
        <label>
            <input type="checkbox" can-value="addOn.Patches" /> {{{dictAddTo.print-patches}}} (+ {{AddOn.DisplayPricePatches}})
        </label>
    </div>
    {{/if}}
    {{/if}}
  </div>
</template>
<script>
export default {
  try {
                        this.scope.attr('addOn', this.element.data('itemData').attr('AddOn'));
                        this.scope.attr('articleId', this.element.data('itemData').attr('Id'));
                        this.scope.attr('sizeList', this.element.data('itemData').attr('SizeList'));
                        try {
                            this.scope.attr('baseProductId', this.element.data('itemData').attr('BaseProductId'));
                        } catch (err) {
                            this.scope.attr('baseProductId', null);
                        }
                    } catch (err) { }
                    try {
                        if (this.element.data('itemData').attr('AddOn') != null) {
                            if (this.element.data('itemData').attr('AddOn').attr('PrintTypeId') == 1) {
                                this.scope.attr('showPatches', true);
                            }
                        }
                        if (this.element.data('itemData').attr('SizeList') != null && !this.element.data('itemData').IsOneSize) { //Hantera att sätta sizeValue för onesize då den aldrig triggas från selecten nu.
                            this.scope.attr('sizeValue', -1);
                        } else {
                            this.scope.attr('sizeValue', this.element.data('itemData').attr('SizeList')[0].Value);
                        }
                    } catch (err) { }
}
</script>
<style lang="scss">

</style>