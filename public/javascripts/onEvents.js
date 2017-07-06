
const setupOnEvents = function setupOnEvents() {
  let socket = io();
  let poloLenderAppConnection;

  socket.on('connect', function () {
    poloLenderAppConnection = 'connected';
    hideConnectionErrorMessage();
    updatePoloLenderAppStatus();
  });
  socket.on('reconnect', function () {
    poloLenderAppConnection = 'connected';
    hideConnectionErrorMessage();
    updatePoloLenderAppStatus();
  });
  socket.on("connect_error", function (err) {
    poloLenderAppConnection = `connect error, ${err.type}: ${err.message}`;
    showConnectionErrorMessage();
    updatePoloLenderAppStatus();
  });
  socket.on("reconnect_error", function (err) {
    poloLenderAppConnection = `reconnect error, ${err.type}: ${err.message}`;
    showConnectionErrorMessage();
    updatePoloLenderAppStatus();
  });
  socket.on('disconnect', function () {
    poloLenderAppConnection = 'disconnected';
    showConnectionErrorMessage();
    updatePoloLenderAppStatus();
  });
  socket.on("reconnecting", function (attemptNumber) {
    poloLenderAppConnection = `reconnecting (${attemptNumber})`;
    showConnectionErrorMessage();
    updatePoloLenderAppStatus();
  });

  /*
  let onevent = socket.onevent;
  socket.onevent = function (packet) {
    let args = packet.data || [];
    onevent.call(this, packet);    // original call
    packet.data = ['*'].concat(args);
    onevent.call(this, packet);      // additional call to catch-all
  };
  socket.on('*', function (event, data) {
  });
  */

  socket.on('configUpdate', function (data) {
    config = data;
    updatePoloLenderAppStatus();
    updateAdvisorEngineStatus();
  });
  socket.on('clientMessageUpdate', function(data) {
    clientMessage = data;
    updatePoloLenderAppStatus();
    updateLendingEngineStatusStatus();
  });
  socket.on('statusUpdate', function (data) {
    status = data;
    updatePoloLenderAppStatus();
    updateAdvisorEngineStatus();
  });
  socket.on('advisorInfo', function (data) {
    updateAdvisorInfo(data);
  });
  socket.on('performanceReport', updatePerformanceReport);
  socket.on('liveUpdates', updateLive);
  socket.on('lendingHistory', updateLendingHistory);
  socket.on('updatedAppConfig.startSettings', updatedAppConfig.startSettings);
};