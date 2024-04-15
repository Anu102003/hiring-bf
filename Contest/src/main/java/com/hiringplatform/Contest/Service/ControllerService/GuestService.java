package com.hiringplatform.Contest.Service.ControllerService;

import com.hiringplatform.Contest.Service.CustomService.AdminServices;
import com.hiringplatform.Contest.Service.Jwt.JwtService;
import com.hiringplatform.Contest.Service.UserDetailsService.EmployeeUserDetailsService;
import com.hiringplatform.Contest.Service.UserDetailsService.GuestUserDetailsService;
import com.hiringplatform.Contest.model.DTO.AuthResDTO;
import com.hiringplatform.Contest.model.DTO.LoginDTO;
import com.hiringplatform.Contest.model.DTO.ResTokenDTO;
import com.hiringplatform.Contest.model.Entity.*;
import com.hiringplatform.Contest.model.DTO.ResponseDTO;
import com.hiringplatform.Contest.repos.Contestrepo;
import com.hiringplatform.Contest.repos.Employeerepo;
import com.hiringplatform.Contest.repos.Guestrepo;
import com.hiringplatform.Contest.repos.McqQuestionrepo;
import com.nimbusds.jose.shaded.gson.JsonArray;
import com.nimbusds.jose.shaded.gson.JsonElement;
import com.nimbusds.jose.shaded.gson.JsonObject;
import com.nimbusds.jose.shaded.gson.JsonParser;
import net.minidev.json.JSONObject;
import net.minidev.json.JSONValue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import javax.tools.*;
import java.io.*;
import java.nio.file.Files;
import java.util.Arrays;
import java.util.List;

@Service
public class GuestService {

    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    Guestrepo guestRepository;
    @Autowired
    Employeerepo employeerepo;
    @Autowired
    Contestrepo contestrepo;
    @Autowired
    McqQuestionrepo mcqQuestionrepo;

    @Autowired
    EmployeeUserDetailsService employeeUserDetailsService;
    @Autowired
    GuestUserDetailsService guestUserDetailsService;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtService jwtService;

    public ResponseEntity<ResponseDTO> loginService(LoginDTO loginDTO) {
        System.out.println("Trying to login");
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginDTO.getEmail(),
                        loginDTO.getPassword()
                )
        );
        String email = loginDTO.getEmail();
        String password = loginDTO.getPassword();
        int id = 0;
        UserDetails userDetails = null;
        if(employeerepo.existsByEmail(email)) {
            var user = employeerepo.findByEmail(email);
            id = user.getEid();
            if(passwordEncoder.matches(password, user.getPassword()))
                userDetails = employeeUserDetailsService.loadUserByUsername(email);
        } else if (guestRepository.existsByEmail(email)) {
            var user = guestRepository.findByEmail(email);
            id = user.getUserId();
            if(passwordEncoder.matches( password,user.getPassword()))
                userDetails = guestUserDetailsService.loadUserByUsername(email);
        } else {
            System.out.println("user doesn't exist");
            throw new UsernameNotFoundException("User doesn't exist in the database");
        }

        if(userDetails != null) {
            var token = jwtService.generateToken(userDetails);
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseDTO(HttpStatus.OK, "Valid user", ResTokenDTO.builder()
                    .token(token)
                    .id(id)
                    .role(userDetails.getAuthorities().toString())
                    .build()));
        }
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDTO(HttpStatus.NOT_FOUND,"Not a valid user", null));



//        if (guestRepository.existsByEmail(g.getEmail())) {
//            Guest currentGuest = guestRepository.findByEmail(g.getEmail());
//            if (passwordEncoder.matches(g.getPassword(), currentGuest.getPassword())) {
//                ResponseEntity.status(HttpStatus.OK).body(new ResponseDTO(HttpStatus.OK, "This is a valid user", (Object) currentGuest));
//            }
//        }
//
//        else if(employeerepo.existsByEmail(g.getEmail())){
//            Employee Eid = employeerepo.findByEmail(g.getEmail());
//            if(passwordEncoder.matches(g.getPassword(),Eid.getPassword())) {
//                return ResponseEntity.status(HttpStatus.OK).body(new ResponseDTO(HttpStatus.OK, "This is a valid user", (Object)Eid));
//            }
//        }

//        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseDTO(HttpStatus.NOT_FOUND, "Not a valid user", null));
    }

    public ResponseEntity<ResponseDTO> signupService(Guest user){
        if (guestRepository.existsByEmail(user.getEmail())){
            Guest currentGuest = guestRepository.findByEmail(user.getEmail());
            currentGuest.setPassword(user.getPassword());
            currentGuest.setName(user.getName());
            guestRepository.save(currentGuest);
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseDTO(HttpStatus.OK, "The user added successfully", user));
        }
        else{
            Employee currentEmployee = employeerepo.findByEmail(user.getEmail());
            currentEmployee.setName(user.getName());
            System.out.println(currentEmployee.getName());
            currentEmployee.setPassword(user.getPassword());
            employeerepo.save(currentEmployee);
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseDTO(HttpStatus.OK, "The Employee added successfully", user));
        }
    }

    public ResponseEntity<ResponseDTO> viewscoreService(int Cid) {
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDTO(HttpStatus.OK, "The List of candidates who participated in the contest", contestrepo.findById(Cid)));

//       return guestRepository.findByContestOrderByTotalMarksDesc(contestrepo.findById(Cid).get());
    }

    public ResponseEntity<ResponseDTO> evaluateService(int Gid,String output){
        int partL = 0, partG = 0, partC = 0;
        JsonArray jsonArray = JsonParser.parseString(output).getAsJsonArray();
        for(JsonElement element : jsonArray){
            JsonObject object = element.getAsJsonObject();
            String Qid = object.get("Qid").getAsString();
            String ans = object.get("ans").getAsString();
            McqQuestion mcqQuestion = mcqQuestionrepo.findById(Qid).get();

            if(mcqQuestion.getCorrectOp().equals(ans)) {
                if(mcqQuestion.getPart().equals("logical"))
                    partL++;
                else if (mcqQuestion.getPart().equals("grammer"))
                    partG++;
                else
                    partC++;  }
        }

        Guest guest = guestRepository.findById(Gid).get();
        JSONObject mark = new JSONObject();

        mark.put("logical", Integer.valueOf(partL));
        mark.put("grammer",Integer.valueOf(partG));
        mark.put("coding",Integer.valueOf(partC));

        guest.setMcqMarks(mark.toString());
        guest.setMcqQues(output);

        int total=partL+partC+partG;
        guest.setTotalMarks(total);
        guestRepository.save(guest);

        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDTO(HttpStatus.OK, "The contest result saved", null));
    }

    public ResponseEntity<ResponseDTO> sentToOneonOne(int id, int mark) {
        List<Employee> employees = employeerepo.findAll();
        List<Guest> guests = guestRepository.findByMarks(id, mark);

        List<AdminServices.EmployeeGuestPair> employeeGuestPairs = AdminServices.assignGuestsToEmployees(employees, guests);

        for (AdminServices.EmployeeGuestPair employeeGuestPair : employeeGuestPairs) {
            Guest guest = employeeGuestPair.getGuest();
            guest.setEmployee(employeeGuestPair.getEmployee()); guestRepository.save(guest);
        }
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDTO(HttpStatus.OK, "The passed candidates are sent to one on one", null));
    }

    public ResponseEntity<ResponseDTO> findUser(int id) {
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDTO(HttpStatus.OK, "Individual Scores", guestRepository.findById(id)));
    }

    public Guest updateGuest(int userId, Guest updatedGuest) {
        Guest existingGuest = guestRepository.findById(userId).orElse(null);

        if (existingGuest == null) {
            throw new UsernameNotFoundException("Guest not found with userId: " + userId);
        }
        existingGuest.setAdminFeedback(updatedGuest.getAdminFeedback());
        existingGuest.setUserFeedback(updatedGuest.getUserFeedback());
        existingGuest.setStack(updatedGuest.getStack());
        return guestRepository.save(existingGuest);

    }


    public ResponseEntity<ResponseDTO> getContest(int id) {
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDTO(HttpStatus.OK, "Individual Scores", guestRepository.findById(id)));
    }

//    public ResponseEntity<?> getContestsByUserId(@PathVariable int userId) {
//        List<Integer> contests = contestrepo.findContestIdsByUserId(userId);
//
//        if (contests.isEmpty()) {
//            return ResponseEntity.notFound().build();
//        }
//        return ResponseEntity.ok(contests);
//    }

    public JSONObject codeEvaluateService(int Gid,String Cqid,String code) throws IOException {
        JSONObject frontoutput=new JSONObject();
        CodeQuestion c=contestrepo.findById(Cqid).get();
        Object ob= JSONValue.parse(c.getInput());
        JSONObject jb=(JSONObject)ob;
        String input=(String) jb.get("sampleIp");
        Object ob1= JSONValue.parse(c.getOutput());
        JSONObject jb1=(JSONObject)ob1;
        String output=(String) jb1.get("sampleOp");
        try {
            File tempDirectory = Files.createTempDirectory("java-execution").toFile();
            String fileName = "Main.java";
            File javaFile = new File(tempDirectory, fileName);
            try (BufferedWriter writer = new BufferedWriter(new FileWriter(javaFile))) {
                writer.write(code);
            }
            File inputFile = new File(tempDirectory,"input.txt");
            try (PrintWriter writer = new PrintWriter(new FileWriter(inputFile))) {
                writer.write(input);
            } catch (IOException e) {
                e.printStackTrace();
            }
            JSONObject jb2=compileJavaCode(tempDirectory,fileName);
            if(jb2.getAsString("now").equals("false")){
                frontoutput.put("status", "error");
                frontoutput.put("output", jb2.getAsString("error"));
                return frontoutput;
//                return "Error at compilation";
            }
            ProcessBuilder processBuilder = new ProcessBuilder("java", "-cp", tempDirectory.getPath(), "Main");
            processBuilder.redirectInput(ProcessBuilder.Redirect.from(inputFile));
            processBuilder.redirectErrorStream(true);
            Process process = processBuilder.start();
            StringBuilder output2 = new StringBuilder();
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line;
            while ((line = reader.readLine()) != null) {
                output2.append(line);
            }
            int exitCode = process.waitFor();
            if (exitCode == 0) {
                if(output2.toString().equals(output)) {
                    frontoutput.put("status", "success");
                    frontoutput.put("output", output2);
                    return frontoutput;
//                    return "success";
                }
                else{
                    frontoutput.put("status", "error");
                    frontoutput.put("output", output2);
                    return frontoutput;
//                    return "failure";
                }}
            else {
                frontoutput.put("status", "error");
                frontoutput.put("output", output2);
                return frontoutput;
            }
        } catch (IOException | InterruptedException e) {
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            String z = sw.toString();
            frontoutput.put("status","error");
            frontoutput.put("output",z);
            return frontoutput;
        }}
    private JSONObject compileJavaCode(File directory, String fileName) {
        JSONObject jb=new JSONObject();
        JavaCompiler compiler = ToolProvider.getSystemJavaCompiler();
        DiagnosticCollector<JavaFileObject> diagnostics = new DiagnosticCollector<>();
        if (compiler == null) {
            jb.put("now",false);
            jb.put("error","no compiller found");
            return jb;
        }
        try (StandardJavaFileManager fileManager = compiler.getStandardFileManager(null, null, null)) {
            Iterable<? extends JavaFileObject> compilationUnits = fileManager.getJavaFileObjects(new File(directory, fileName));
            List<String> compileOptions = Arrays.asList("-d", directory.getPath());
            JavaCompiler.CompilationTask task = compiler.getTask(null, fileManager, null, compileOptions, null, compilationUnits);
            if(task.call()){
                jb.put("now",true);
                return jb;
            }
            else{
                StringBuilder errorOutput = new StringBuilder("Compilation Errors:\n");
                for (Diagnostic<? extends JavaFileObject> diagnostic : diagnostics.getDiagnostics()) {
                    errorOutput.append(diagnostic.getMessage(null)).append("\n");
                }
                jb.put("now",false);
                jb.put("error",errorOutput.toString());
                return jb;
            }
        }catch (Error | IOException e) {
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            String z = sw.toString();
            jb.put("now",false);
            jb.put("error",z);
            return jb;
        }}

    public void submitCode(String output,String code,int Gid,String Cqid){
        Guest g=guestRepository.findById(Gid).get();
        if(output.equals("success")){
            if(g.getCodeMarks()==null)
                g.setCodeMarks("10");
            else
                g.setCodeMarks(""+(Integer.parseInt(g.getCodeMarks())+10));}
        Object ob= JSONValue.parse(g.getCodeQues());
        JSONObject jb;
        if(ob==null)
            jb=new JSONObject();
        else
            jb=(JSONObject)ob;
        jb.put(Cqid,code);
        g.setCodeQues(jb.toString());
        guestRepository.save(g);
    }
}
