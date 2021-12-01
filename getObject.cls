public class getObject {
@AuraEnabled
    public static List<String> getAllObjects() {
        List<String> objectList = new List<String>();
        List <Schema.SObjectType> gd = Schema.getGlobalDescribe().Values();      
        for(SObjectType Obj : gd){
            objectList.add(Obj.getDescribe().getName());
            objectList.sort();
        }
        return objectList;
    }
   
    @AuraEnabled
    public static List<String> getAllFields( String obj){
        List<String> reqFields = new List<String>();
        Map <String,Schema.SObjectType> gd = Schema.getGlobalDescribe();
        Schema.SObjectType sobjType = gd.get(obj);
        Schema.DescribeSObjectResult r = sobjType.getDescribe();
        Map<String, Schema.SObjectField> MapofField = r.fields.getMap();
        for(String keys: MapofField.keySet()){
           
            reqFields.add(MapofField.get(Keys).getDescribe().getName());
           
        }
        return reqFields;
    }
   
    @AuraEnabled
    public static List<List<String>> queryRecord(String query,List<String> selectedValues){
        /*     List<List<String>> response = new List<List<String>>();
               List<sObject>  queryResult = Database.query(records);

                if(queryResult.size()> 0 ){
                return  queryResult;
                }
                else{            
                return null;
                }   */

        System.debug(selectedValues);
        List<List<String>> response = new List<List<String>>();
        List<sObject> queryResult = Database.query(query);
        for (sObject i : queryResult) {
            List<String> sObjectFieldValues = new List<String>();
            for (String j : selectedValues) {
                sObjectFieldValues.add(String.valueof(i.get(j)));
            }
            response.add(sObjectFieldValues);
        }
        return response;  
       
    }
   
   
}