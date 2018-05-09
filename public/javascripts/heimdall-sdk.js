var CE = (function() { 
        return {
            createInstance: function(info, callback) {
                if (info.token) {
                    window.open(`https://heimdall.cloud-elements.com/v1/application?token=${info.token}`)
                } else if (info.elementKey && info.userSecret && info.applicationId) {
                    window.open(`https://heimdall.cloud-elements.com/v1/application?elementKey=${info.elementKey}&userSecret=${info.userSecret}&applicationId=${info.applicationId}`)
                } else {
                    throw new Error("Must provide either a token or element, userSecret and applicationId")
                }

                if (callback) {
                    window.addEventListener('message', recieveMessage);
                    function recieveMessage(e) {
                        callback(e.data)
                    } 
                } else {
                    return new Promise(function (resolve) {
                        window.addEventListener('message', recieveMessage);
                        function recieveMessage(e) {
                            resolve(e.data)
                        }
                    })
                }
            }
        }
  })();