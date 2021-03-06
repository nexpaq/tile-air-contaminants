function beforeExitActions() {
  Nexpaq.API.Module.SendCommand(Nexpaq.Arguments[0], 'StopSensor', []);
}
document.addEventListener('NexpaqAPIReady', function(event) {        
  Nexpaq.API.Module.addEventListener('DataReceived', function(event) {
    console.log(event);
    // we don't care about data not related to our module
    if(event.module_uuid != Nexpaq.Arguments[0]) return;
    if(event.data_source == 'SensorValue') {
      if(event.variables.status == 'heating') {
        document.getElementById('alcoholValue').innerText = "Heating..";
      }
      if(event.variables.status != 'heating' && event.variables.status != 'updating_referrence') {
        nativeDataUpdateHandler(event.variables.adc_value);
      }
    }
    
  });  

  Nexpaq.API.addEventListener('BeforeExit', beforeExitActions);
});  
/* =========== ON PAGE LOAD HANDLER */
document.addEventListener("DOMContentLoaded", function(event) {
	Nexpaq.Header.create('Air Contaminants');	
	Nexpaq.Header.customize({backgroundColor:"#00C3BD",color:"#FFFFFF",iconColor:"#FFFFFF", borderBottom: "none"});
  Nexpaq.Header.hideShadow();

  document.getElementById('startSensor').addEventListener('click', function() {
    console.log("sensor on");
    Nexpaq.API.Module.SendCommand(Nexpaq.Arguments[0], 'StartSensor', []);
  });
  document.getElementById('stopSensor').addEventListener('click', function() {
    console.log("sensor off");
    Nexpaq.API.Module.SendCommand(Nexpaq.Arguments[0], 'StopSensor', []);
  });
});
