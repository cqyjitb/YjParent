package yj.core.dispath.controllers;

import com.hand.hap.core.IRequest;
import com.hand.hap.system.controllers.BaseController;
import com.hand.hap.system.dto.ResponseData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import yj.core.dispath.dto.InputLog;
import yj.core.dispath.service.IInputLogService;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Controller
public class InputLogController extends BaseController{

@Autowired
private IInputLogService service;


@RequestMapping(value = "/confirmation/input/log/query")
@ResponseBody
public ResponseData query(InputLog dto, @RequestParam(defaultValue = DEFAULT_PAGE) int page,
    @RequestParam(defaultValue = DEFAULT_PAGE_SIZE) int pageSize, HttpServletRequest request) {
    IRequest requestContext = createRequestContext(request);
    return new ResponseData(service.select(requestContext,dto,page,pageSize));
}

@RequestMapping(value = "/confirmation/input/log/submit")
@ResponseBody
public ResponseData update(HttpServletRequest request, BindingResult result, @RequestBody List<InputLog> dto){
    getValidator().validate(dto, result);
    if (result.hasErrors()) {
        ResponseData rd = new ResponseData(false);
        rd.setMessage(getErrorMessage(result, request));
        return rd;
    }
    IRequest requestCtx = createRequestContext(request);
    return new ResponseData(service.batchUpdate(requestCtx, dto));
}


}