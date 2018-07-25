import { Injectable } from '@angular/core';
import { Component, OnInit, NgZone } from '@angular/core';
import * as $ from 'jquery';
@Injectable()
export class BigdatabasenewExportexcelService implements OnInit {
  public pluginName = 'table2excel';
  public element: any;
  public settings: any;
  public _defaults: any;
  public _name: any;
  public defaults = {
    exclude: '.noExl',
    name: 'Table2Excel',
  };
  constructor(element, options) {
    this.element = element;
    // jQuery has an extend method which merges the contents of two or
    // more objects, storing the result in the first object. The first object
    // is generally empty as we don't want to alter the default options for
    // future instances of the plugin
    //
    this.settings = $.extend({}, this.defaults, options);
    this._defaults = this.defaults;
    this._name = this.pluginName;
  }


  ngOnInit(): void {
    alert(0);
    $.fn[this.pluginName] = function (options) {
      const e = this;
      e.each(function () {
        if (!$.data(e, 'plugin_' + this.pluginName)) {
          $.data(e, 'plugin_' + this.pluginName, new BigdatabasenewExportexcelService(this, options));
        }
      });

      // chain jQuery functions
      return e;
    };
  }


  init() {
    const e = this;
    e['template'] = {
      // tslint:disable-next-line:max-line-length
      head: '<html xmlns:o=\'urn:schemas-microsoft-com:office:office\' xmlns:x=\'urn:schemas-microsoft-com:office:excel\' xmlns=\'http://www.w3.org/TR/REC-html40\'><head><meta charset=\'UTF-8\'><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets>',
      sheet: {
        head: '<x:ExcelWorksheet><x:Name>',
        tail: '</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>',
      },
      mid: '</x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body>',
      table: {
        head: '<table>',
        tail: '</table>',
      },
      foot: '</body></html>',
    };

    e['tableRows'] = [];

    // get contents of table except for exclude
    $(e.element).each(function (i, o) {
      let tempRows = '';
      // tslint:disable-next-line:no-shadowed-variable
      $(o).find('tr').not(e.settings.exclude).each(function (i, o) {
        tempRows += '<tr>' + $(o).html() + '</tr>';
      });
      e['tableRows'].push(tempRows);
    });

    // exclude img tags
    if (e.settings.exclude_img) {
      e['tableRows'][0] = this.exclude_img(e['tableRows'][0]);
    }

    // exclude link tags
    if (e.settings.exclude_links) {
      e['tableRows'][0] = this.exclude_links(e['tableRows'][0]);
    }

    // exclude input tags
    if (e.settings.exclude_inputs) {
      e['tableRows'][0] = this.exclude_inputs(e['tableRows'][0]);
    }

    e['tableToExcel'](e['tableRows'], e.settings.name);

  }

  tableToExcel(table, name) {
    const e = this;
    let fullTemplate: any;
    let i;
    let link;
    let a;

    e['uri'] = 'data:application/vnd.ms-excel;base64,';
    e['base64'] = function (s) {
      // return window.btoa(unescape(encodeURIComponent(s)));
    };
    e['format'] = function (s, c) {
      return s.replace(/{(\w+)}/g, function (m, p) {
        return c[p];
      });
    };
    e['ctx'] = {
      worksheet: name || 'Worksheet',
      table: table,
    };

    fullTemplate = e['template'].head;

    if ($.isArray(table)) {
      // tslint:disable-next-line:no-shadowed-variable
      // tslint:disable-next-line:forin
      for (i in table) {
        // tslint:disable-next-line:comment-format
        //fullTemplate += e.template.sheet.head + '{worksheet' + i + '}' + e.template.sheet.tail;
        fullTemplate += e['template'].sheet.head + 'Table' + i + '' + e['template'].sheet.tail;
      }
    }

    fullTemplate += e['template'].mid;

    if ($.isArray(table)) {
      // tslint:disable-next-line:forin
      for (i in table) {
        fullTemplate += e['template'].table.head + '{table' + i + '}' + e['template'].table.tail;
      }
    }

    fullTemplate += e['template'].foot;

    // tslint:disable-next-line:forin
    for (i in table) {
      e['ctx']['table' + i] = table[i];
    }
    delete e['ctx'].table;


    // tslint:disable-next-line:max-line-length
    link = e['uri'] + e['base64'](e['format'](fullTemplate, e['ctx']));
    a = document.createElement('a');
    a.download = this.getFileName(e.settings);
    a.href = link;
    a.click();

    return true;
  }

  getFileName(settings) {
    return (settings.filename ? settings.filename : 'table2excel') + '.xlsx';
  }

  // Removes all img tags
  exclude_img(string) {
    return string.replace(/<img[^>]*>/gi, '');
  }

  // Removes all link tags
  exclude_links(string) {
    return string.replace(/<A[^>]*>|<\/A>/g, '');
  }

  // Removes input params
  exclude_inputs(string) {
    return string.replace(/<input[^>]*>|<\/input>/gi, '');
  }


}
