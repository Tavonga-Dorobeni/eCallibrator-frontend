<template>
  <div class="space-y-5 profile-page">
    <div>
      <Card>
        <h4 class="text-slate-900 dark:text-white text-xl mb-2">Details</h4>
        <div class="grid lg:grid-cols-1 grid-cols-1 gap-5">
          <div class="grid lg:grid-cols-4 grid-cols-1 gap-5">
            <Textinput isReadonly="true" label="Serial Number" :modelValue="activeData.SerialNumber" type="text" placeholder="------" />
            <Textinput isReadonly="true" label="Tool" :modelValue="allToolTypes.filter(t => t.ToolTypeID == activeData.ToolTypeID).map(t => t.Description)[0]" type="text" placeholder="------" />
            <Textinput isReadonly="true" label="Range" :modelValue="activeData.Range" type="text" placeholder="------" />
            <Textinput isReadonly="true" label="Section" :modelValue="allSections.filter(t => t.SectionID == activeData.SectionID).map(t => t.Code)[0]" type="text" placeholder="------" />
          </div>
        </div>

        <h4 class="text-slate-900 dark:text-white text-xl mb-2 mt-6">Calibration Procedure</h4>
        <div class="grid lg:grid-cols-1 grid-cols-1 gap-5">
          <div class="grid lg:grid-cols-4 grid-cols-1 gap-5">
            <Textinput label="Temperature" v-model="calibration_data.Temp" type="text" placeholder="------" />
            <Textinput label="Relative Humidity" v-model="calibration_data.Hum" type="text" placeholder="------" />
            <Textinput label="Calibrator No:" v-model="calibration_data.CalNo" type="text" placeholder="------" />
            <Textinput label="Calibrator P/No:" v-model="calibration_data.CalPNo" type="text" placeholder="------" />
            <Textinput isReadonly="true" label="Calibrator Due Date:" :modelValue="activeData.NextCallibration.substring(0, 10)" type="text" placeholder="------" />
            <FromGroup v-if="!view" label="Next Calibration Date" name="d1">
              <flat-pickr
                v-model="calibration_data.NextDueDate"
                class="form-control"
                id="d1"
                placeholder="yyyy, dd M"
              />
            </FromGroup>
          </div>
        </div>

        <h4 class="text-slate-900 dark:text-white text-xl mb-2 mt-6">Test Settings</h4>
        <div class="grid lg:grid-cols-1 grid-cols-1 gap-5">
          <vue-good-table
            class="mx-1"
            :columns="columns"
            styleClass="vgt-table table-head v-middle striped lesspadding2"
            :rows="calibration_settings"
            :sort-options="{
              enabled: false,
            }"
          >
            <template v-slot:table-row="props">
              <span
                v-if="props.column.field == 'Actual'"
                class="text-slate-500 dark:text-slate-400 block min-w-[108px]"
              >
                <input @input="changeCell(props.row[props.column.field], props.column.field, props.row.originalIndex)" v-model="props.row.Actual" type="text" placeholder="------" class="input-custom w-full block h-[20px]"/>
              </span>
              <span
                v-if="props.column.field == 'Indicated'"
                class="text-slate-500 dark:text-slate-400 block min-w-[108px]"
              >
                <input @input="changeCell(props.row[props.column.field], props.column.field, props.row.originalIndex)" v-model="props.row.Indicated" type="text" placeholder="------" class="input-custom w-full block h-[20px]" />
              </span>
              <span
                v-if="props.column.field == 'Error'"
                class="text-slate-500 dark:text-slate-400 block min-w-[108px]"
              >
                <input @input="changeCell(props.row[props.column.field], props.column.field, props.row.originalIndex)" v-model="props.row.Error" type="text" placeholder="------" class="input-custom w-full block h-[20px]" />
              </span>
              <span
                v-if="props.column.field == 'Units'"
                class="text-slate-500 dark:text-slate-400 block min-w-[108px]"
              >
                <input @input="changeCell(props.row[props.column.field], props.column.field, props.row.originalIndex)" v-model="props.row.Units" type="text" placeholder="e.g. Bars" class="input-custom w-full block h-[20px]" />
              </span>
            </template>
          </vue-good-table>
        </div>
        <div class="mt-4 text-right space-x-3">
          <Button text="Cancel" btnClass="btn-light" />
          <Button text="Submit" @click="generatePDF" btnClass="btn-dark" />
        </div>
      </Card>
    </div>
  </div>
</template>
<script>
import Card from "@/components/Card";
import Icon from "@/components/Icon";
import Button from "@/components/Button";
import FromGroup from "@/components/FromGroup";
import Textarea from "@/components/Textarea";
import Textinput from "@/components/Textinput";
import Fileinput from "@/components/Fileinput";
import Modal from '@/components/Modal/Modal';
import avartar from '@/assets/images/avatar/avatar.png';
import UserService from "@/services/user.service";
import { useToast } from "vue-toastification";
import { basicArea, basicAreaDark } from "@/constant/appex-chart.js";
import {mapGetters, mapActions} from "vuex";
import jsPDF from 'jspdf';
import 'jspdf-autotable'

export default {
  components: {
    Card,
    Icon,
    Button,
    Textinput,
    FromGroup,
    Textarea,
    Fileinput,
    Modal
  },
  data() {
    return {
      basicArea,
      basicAreaDark,
      currentFile: undefined,
      FormData: {
        file: null
      },
      columns: [
        {
          label: 'Actual',
          field: 'Actual',
        },

        {
          label: 'Indicated',
          field: 'Indicated',
        },

        {
          label: 'Error',
          field: 'Error',
        },
        {
          label: 'Units',
          field: 'Units',
        }
      ],
      calibration_settings: [
        {},
        {},
        {},
        {},
        {},
        {}
      ],
      calibration_data: {}
    };
  },

  computed: {
    ...mapGetters([
    'activeData',
    'allSections',
    'allToolTypes'
    ]),

    currentUser() {
      return this.$store.state.auth.user;
    },
  },

  methods: {
    ...mapActions([
    ]),

    // selectFile(file) {
    //   this.currentFile = file;
    // },

    calibrate(){
      const toast = useToast();
      UserService.update(this.currentUser.id, this.currentUser)
      .then(data =>{
        console.log(data)
        toast.success(data.data.message, {
          timeout: 3000,
        }); 
        this.generatePDF()
      },
      error => {
        toast.error(error.message, {
            timeout: 3000,
          });   
      })
    },

    changeCell(changedData, column, row) {
      this.calibration_settings[row][column] = changedData
    },

    generatePDF() {
      const columns = [
        { title: 'Actual',  dataKey: 'Actual'},
        { title: 'Indicated', dataKey: 'Indicated'},
        { title: 'Error', dataKey: 'Error'},
        { title: 'Units', dataKey: 'Units'}
      ];

      const addFooters = doc => {
        const pageCount = doc.internal.getNumberOfPages()


        for (var i = 1; i <= pageCount; i++) {
          var imgData = 'data:image/png;base64,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';
          // var img = new Image();
          // img.src = "https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.carhire4lower.com%2Fairlines%2Fzimbabwe-airlines%2Fzimbabwe-airlines-images%2Fair-zimbabwe-logo.jpg&tbnid=epmWCFttHsuoNM&vet=12ahUKEwi_qeflzuiAAxUkrycCHRqwDV0QMygGegQIARBc..i&imgrefurl=https%3A%2F%2Fwww.carhire4lower.com%2Fairlines%2Fzimbabwe-airlines%2Fair-zimbabwe-information.php&docid=tptRXW9eAFuJwM&w=600&h=400&q=air%20zimbabwe%20logo&ved=2ahUKEwi_qeflzuiAAxUkrycCHRqwDV0QMygGegQIARBc";
          
          doc.addImage(imgData , 'PNG', 0.5, 0.2, 1.5, 1);
          doc.setPage(i)
          // text is placed using x, y coordinates
          doc.setFontSize(10).text('Air Zimbabwe (Pvt) Ltd', 6.0, 0.5);
          doc.setFontSize(6).text('P.O Box AP1', 6.0, 0.6);
          doc.setFontSize(6).text('R.G. Mugabe International Airport', 6.0, 0.7);
          doc.setFontSize(6).text('Harare, Zimbabwe', 6.0, 0.8);
          doc.setFontSize(6).text('Tell: 575111', 6.0, 0.9);
          doc.setFontSize(6).text('Fax: 263-4-575468', 6.0, 1.0);
          doc.setFontSize(10).setFont(undefined, 'bold').text('CERTIFICATE OF CALIBRATION', 0.5, 1.2);
          doc.setFontSize(10).setFont(undefined, 'normal').text(new Date().toISOString().substring(0, 10), 6.0, 1.2);

          doc.setFontSize(10).text('UNIT:  ' + this.allToolTypes.filter(t => t.ToolTypeID == this.activeData.ToolTypeID).map(t => t.Description)[0], 0.5, 2.0);
          doc.setFontSize(10).text('LOCATION:  ' + this.allSections.filter(t => t.SectionID == this.activeData.SectionID).map(t => t.Code)[0], 0.5, 2.3);
          doc.setFontSize(10).text('JOB NO:', 0.5, 2.6);

          doc.setFontSize(10).text('SERIAL NO:  ' + this.activeData.SerialNumber, 4.5, 2.0);
          doc.setFontSize(10).text('RANGE:  ' + this.activeData.Range, 4.5, 2.3);
          doc.setFontSize(10).text('REL NO:', 4.5, 2.6);

          doc.setFontSize(10).setFont(undefined, 'bold').text('CALIBRATION PROCEDURE', 0.5, 3.2);
          doc.setFontSize(10).setFont(undefined, 'normal').text('TEMPERATURE:  ' + this.calibration_data.Temp, 0.5, 3.5);
          doc.setFontSize(10).text('CALIBRATOR NO:  '  + this.calibration_data.CalNo, 0.5, 3.8);
          doc.setFontSize(10).text('CALIBRATOR DUE DATE:  ' + this.activeData.NextCallibration.substring(0, 10), 0.5, 4.1);

          doc.setFontSize(10).text('RELATIVE HUMIDITY:  '  + this.calibration_data.Hum, 4.5, 3.5);
          doc.setFontSize(10).text('CALIBRATOR P/NO:  '  + this.calibration_data.CalPNo, 4.5, 3.8);

          doc.setFontSize(10).setFont(undefined, 'bold').text('TESTED AT THE FOLLOWING SETTINGS', 0.5, 4.7);

          doc.setFontSize(10).setFont(undefined, 'normal').text('DEFECTS/RECTIFICATIONS:', 0.5, 7.7);
          doc.setFontSize(10).text('THIS EQUIPMENT HAS BEEN TESTED/REPAIRED (delete whichever does not apply) IN ACCORDANCE WITH', 0.5, 8.1);
          doc.setFontSize(10).text('CURRENT PROCEDURES AND FOUND TO BE SERVICABLE/UNSERVICABLE (delete whichever does not apply)', 0.5, 8.3);
          doc.setFontSize(10).text('FOR FUTURE USE', 0.5, 8.5);

          doc.setFontSize(10).text('TESTED BY:', 0.5, 9.0);
          doc.setFontSize(10).text('SIGNATURE: ......................................................................', 0.5, 9.3);
          doc.setFontSize(10).text('AUTHORITY:', 4.5, 9.3);
          doc.setFontSize(10).text('DATE: ' + new Date().toISOString().substring(0, 10), 0.5, 9.6);
          doc.setFontSize(10).text('NEXT PERIODIC CHECK DATE:  ' + this.calibration_data.NextDueDate, 4.5, 9.6);

          // create a line under heading 
          doc.setLineWidth(0.05).line(0.5, 1.5, 8.0, 1.5);
          doc.setLineWidth(0.01).line(0.5, 4.97, 8.0, 4.97);
          doc.setLineWidth(0.01).line(0.5, 5.27, 8.0, 5.27);
          doc.setFontSize(6).text('Page ' + String(i) + ' of ' + String(pageCount), 4.3, 10.7, {
            align: 'center'
          })
        }
      }

      let doc = new jsPDF({
        orientation: "potrait",
        unit: "in",
        format: "letter"
      });

      doc.setFont('helvetica');
      doc.setFontSize(5);
      doc.autoTable({
        columns,
        body: this.calibration_settings,
        margin: { left: 0.5, top: 5.0 },
        styles: {overflow: 'linebreak',
                fontSize: 10},
        showHeader: 'everyPage',
        theme: 'plain'
      });
      addFooters(doc);
      doc.output('dataurlnewwindow');
    },
  }
};
</script>
<style lang="scss" scoped></style>
