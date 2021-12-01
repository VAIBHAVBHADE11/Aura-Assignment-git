({
    init : function(component, event, helper) {
        const options =[]
        console.log('Intialize')
        const action= component.get("c.getAllObjects");
        action.setCallback(this,function(response){
            const state =response.getState();
       
            if(state ==="SUCCESS"){
                const allvalues=response.getReturnValue();
                console.log(allvalues);
                    allvalues.forEach((value,i)=>{
                        var Item ={
                            "label": value,
                            "value": value
                        }
                        options.push(Item);
                    })
                    component.set("v.options",options)
            }    
        });
        $A.enqueueAction(action);      
    },
     
    showField : function(component,event,handler){
        const fields =[]
        var selectedOptionValue = event.getParam("value");
        component.set("v.objName",selectedOptionValue);
        const action =  component.get("c.getAllFields");
        action.setParams({
            obj:selectedOptionValue
        })
        action.setCallback(this,function(response){
            const state = response.getState();
            console.log(state)
             if(state ==="SUCCESS"){
                const allvalues=response.getReturnValue();
                console.log(allvalues);
                   allvalues.forEach((value,i)=>{
                        var Item ={
                            "label": value,
                            "value": value
                        }
                        fields.push(Item);
                    })
                    component.set("v.fields",fields)
                    var listfield = component.get("v.fields");
                    component.set("v.values",listfield);
            }
        })        
          $A.enqueueAction(action);      
    } ,
   
    showQuery :function(component,event,helper){
        var selectedOptionValue = event.getParam("value");
        var selectedlist = component.set("v.sltdvalue",selectedOptionValue.toString() + "");
        var getvalue = component.get("v.sltdvalue");
          var objtName = component.get("v.objName");  
          var SelectId = component.get("v.options");  
          var makequery = component.get("v.sltdvalue");
       
          var querymaker = 'SELECT'+' ' + makequery +' '+'From'+ ' ' + objtName;  
      component.set("v.query",querymaker);
       
        var myArr = makequery;
       var resultField = myArr.split(',');
        component.set("v.FieldList",resultField);
     
        console.log(component.get("v.values"));
    },
   
    fetchRecord :function(component,event,helper){
       
       var selectedFields = component.get("v.values");
        var columns = [];
       selectedFields.forEach((value,i)=>{
                        var Item ={
                            "label": value,
                            "value": value
                        }
                        columns.push(Item);
                    })
                    component.set("v.columns",columns)
       
        var datalist = component.get("v.query");
        var action = component.get('c.queryRecord');
        var selectedValues = component.get("v.values");
    console.log('Hii '+selectedValues);
        action.setParams({
            query : datalist,
          selectedValues: selectedValues
        });
    action.setCallback(this, function(response){
            var state = response.getState();      
            if (state === "SUCCESS") {
                var sObject = response.getReturnValue();
                     
                if(sObject != null){
                   
                    component.set("v.dataList",sObject);
                   
                }else{
                   
                    alert('No record to fetch');
                }  
               
            }
            else{
                alert('ERROR');
            }
            component.set("v.showRecord",true);
         console.log(sObject);
        });        
        $A.enqueueAction(action);      
    }
})