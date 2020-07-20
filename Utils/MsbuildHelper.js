
 function GetMsBuildParams(config,project){
    return `msbuild.exe ${project.mustSignApk?getCompilationParams(config):''} "/t:restore"   "/p:Configuration=Release" "/p:OutputPath=${config.outputPath}/${project.outputName}"  "${project.path}"
            `
}

function getCompilationParams(config){
      return `"/t:SignAndroidPackage"  "/p:AndroidKeyStore=true" "/p:AndroidSigningKeyAlias=${config.keystoreAlias}" "/p:AndroidSigningKeyPass=${config.keystorePass}" "/p:AndroidSigningKeyStore=${config.keystorePath}" "/p:AndroidSigningStorePass=${config.keystorePass}"`
}

module.exports = {GetMsBuildParams};