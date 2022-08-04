export interface Params {}

export interface DictType {
  dictLabel: string;
  dictValue: string;
  searchValue?: any;
  createBy?: string;
  createTime?: string;
  updateBy?: any;
  updateTime?: any;
  remark: string;
  dictName: string;
  params?: Params;
  dictCode?: number;
  dictSort?: number;

  dictType?: string;
  cssClass?: string;
  listClass?: string;
  isDefault?: string;
  status?: string;
  default?: boolean;
}
