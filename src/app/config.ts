
export class CONFIG {

   // public static domainUrl: string = "https://staging.hyundaicxreview.com/cxplaybook/";
    public static domainUrl: string = "https://codebluehomecare.com/codeblue/";
//public static domainUrl: string = "https://codebluehomecare.com/dev-codeblue/";
     //public static domainUrl: string = "https://dev.hyundaicxreview.com/cxplaybook/";

   public static _url: string = CONFIG.domainUrl+"_api/web/en_us/";
   
   public static _loggedIn: boolean;
   public static _user_mobile: any='';
   public static _active_url:any='';
   public static forgot_cont:boolean = false;
   public static forgot_user:any;
   public static forgot_mobile_no:any;
   public static page_change:boolean;
   public static am_page_change:boolean;
   public static urlvalue:any='';
   public static back_value:boolean = false;

   constructor() { }
    
}
