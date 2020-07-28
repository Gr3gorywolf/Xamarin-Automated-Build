
 function GetMsBuildParams(config,project){
    let mustRestore = project.mustRestore === undefined? false:project.mustRestore;
    let mustRebuild = project.mustRebuild === undefined? false:project.mustRebuild;
    var outputPath = project.outputPath !== undefined? project.outputPath : `${config.outputPath}/${project.outputName}`;
    return `msbuild.exe ${project.mustSignApk?getCompilationParams(config):''} ${mustRestore?"/t:restore":''} ${mustRebuild?'/t:clean;build':''}  "/p:Configuration=Release" "/p:OutputPath=${outputPath}"  "${project.path}"
            `
}

function getCompilationParams(config){
      return `"/t:SignAndroidPackage"  "/p:AndroidKeyStore=true" "/p:AndroidSigningKeyAlias=${config.keystoreAlias}" "/p:AndroidSigningKeyPass=${config.keystorePass}" "/p:AndroidSigningKeyStore=${config.keystorePath}" "/p:AndroidSigningStorePass=${config.keystorePass}"`
}

module.exports = {GetMsBuildParams};