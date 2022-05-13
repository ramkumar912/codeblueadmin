export class LocalStorage{
	
	//USED SESSION  STORAGE

	private static jwtString:any='';
	private static local_json:any=null;

	static isSetJWT(){
		const val = sessionStorage.getItem('jwt');
		if(val==null || val==undefined || val=='') return false;
		return true;
	}

	static createJWT(){
		this.local_json = {};
		this.saveJWT();
	}

	static loadJWT(){
		this.jwtString = sessionStorage.getItem('jwt');
		try{
			this.local_json = JSON.parse(this.jwtString);
		}catch(e){
		}
	}

	static saveJWT(){
		sessionStorage.setItem('jwt', JSON.stringify(this.local_json));
	}

	static getJSONValue(itm:string){
		if( this.local_json!=undefined && this.local_json != null ){
			return (this.local_json[itm]!=undefined) ? JSON.parse(this.local_json[itm]) : null;
		}else{
			return null;
		}
	}

	static getValue(itm:string){		
		if( this.local_json != null ){
			return this.local_json[itm];
		}else{
			return null;
		}
	}

	static setValue(itm:string, val:any){		
		if( this.local_json != null ) {
			this.local_json[itm] = val;	
			this.saveJWT();
		}else{
		};
	}

	static removeValue(itm:string){
		if( this.local_json != null ) {
			delete this.local_json[itm] ;	
			this.saveJWT();
		}else{
		};
	}	

}